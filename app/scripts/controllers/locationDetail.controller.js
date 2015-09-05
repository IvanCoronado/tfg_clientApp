(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller($scope, $filter, DataService, lodash, initLocation) {
        var vm = this,
            todayDate = $filter('date')(new Date().getTime(), 'yyyy-MM-dd');


        vm.locationId = initLocation;

        vm.countId = null;
        vm.temperatureId = null;
        vm.humidityId = null;


        initCountersId();


        ////////////////


        function initCountersId() {
            lodash.forEach(vm.locationId.devices, function(device) {
                switch (device.type_name) {
                    case 'COUNTER':
                        vm.countId = device.id;
                        getCounterData();
                        break;
                    case 'TEMPERATURE':
                        vm.temperatureId = device.id;
                        getTemperatureData();
                        break;
                    case 'HUMIDITY':
                        vm.humidityId = device.id;
                        getHumidityData();
                        break;
                    default:

                }
            });
        }


        function getCounterData() {
            getStatus(vm.countId, 'count').then(function(response) {
                vm.counterStatus = response;
            });

            getTimeline(vm.countId, todayDate, 7, 'count', 'day').then(function(response) {
                $scope.counterWeekDatapoints = getWeekDatapoints(response, 'counter');
                $scope.counterWeekDatacolumns = [{
                    "id": "counter-max",
                    "type": "bar",
                    "name": "Aforo máximo",
                    "color": "#F44336"
                }, {
                    "id": "counter-min",
                    "type": "bar",
                    "name": "Aforo mínimo",
                    "color": "#3F51B5"
                }];
            });

        }

        function getTemperatureData() {
            getStatus(vm.temperatureId, 'unique').then(function(response) {
                vm.temperatureStatus = response;
            });
            getTimeline(vm.temperatureId, todayDate, 7, 'unique', 'day').then(function(response) {
                $scope.temperatureWeekDatapoints = getWeekDatapoints(response, 'temperature');
                $scope.temperatureWeekDatacolumns = [{
                    "id": "temperature-max",
                    "type": "bar",
                    "name": "Temperatura máxima",
                    "color": "#F44336"
                }, {
                    "id": "temperature-min",
                    "type": "bar",
                    "name": "Temperatura mínima",
                    "color": "#3F51B5"
                }];
            });

        }

        function getHumidityData() {
            getStatus(vm.humidityId, 'unique').then(function(response) {
                vm.humidityStatus = response;
            });
            getTimeline(vm.humidityId, todayDate, 7, 'unique', 'day').then(function(response) {
                $scope.humidityWeekDatapoints = getWeekDatapoints(response, 'humidity');
                $scope.humidityWeekDatacolumns = [{
                    "id": "humidity-max",
                    "type": "bar",
                    "name": "% Humedad máxima",
                    "color": "#F44336"
                }, {
                    "id": "humidity-min",
                    "type": "bar",
                    "name": "% Humedad mínima",
                    "color": "#3F51B5"
                }];
            });
        }


        function getStatus(idDevice, typeDevice) {
            return DataService.getDeviceStatus(idDevice, typeDevice).then(function(response) {
                if (typeof response !== 'undefined') {
                    return lodash.first(response.devices);
                }
            });
        }

        function getTimeline(idDevice, date, n_days, typeDevice, group_time) {
            return DataService.getDeviceTimeline(idDevice, date, n_days, typeDevice, group_time).then(function(response) {
                if (typeof response !== 'undefined') {
                    return response;
                }
            });
        }

        function getWeekDatapoints(data, typeText) {
            var datapoints = [];
            getLastSevenDaysText().forEach(function(dayText) {
                var dayData = {}
                dayData['x'] = dayText;
                dayData[typeText + "-max"] = 0;
                dayData[typeText + "-min"] = 0;

                datapoints.push(dayData);
            });

            lodash.forEach(data, function(dayData) {
                var weekDayIndex = ((new Date(data[0].date)).getDay() + 6) % 7; 
                datapoints[weekDayIndex][typeText + "-max"] = dayData.value_max;
                datapoints[weekDayIndex][typeText + "-min"] = dayData.value_min;
            })

            return datapoints;
        }


        $scope.datax = {
            "id": "x"
        };

        /*
         *  Return an array with the last 7 days in text:
         *  If today is Wednesday, the function will return [Thursday,Friday,Saturday,Sunday,Monday,Tuesday,Wednesday]
         **/
        function getLastSevenDaysText() {
            var day = (new Date()).getDay();
            var weekday = new Array();
            weekday[0] = "Domingo";
            weekday[1] = "Lunes";
            weekday[2] = "Martes";
            weekday[3] = "Miercoles";
            weekday[4] = "Jueves";
            weekday[5] = "Viernes";
            weekday[6] = "Sábado";

            var lastSevenDays = [];
            for (var i = day+1; i <= 6; i++) {
                lastSevenDays.push(weekday[i]);
            }
            for (var j = 0; j <= day; j++) {
                lastSevenDays.push(weekday[j]);
            }

            return lastSevenDays;
        }



    }
})();
