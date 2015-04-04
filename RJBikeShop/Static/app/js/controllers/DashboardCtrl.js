'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$location', 'BikeService',
    function($scope, $location, Bike) {
    
    angular.extend($scope, {
        view: {
            list: true
        }
    });

    function init() {
        Bike.getAllBikes().then(function(success) {
            $scope.bikes = success;
        });
    };

}]);
