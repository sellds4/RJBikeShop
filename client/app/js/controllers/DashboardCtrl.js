'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$location', 'BikeService',
    function($scope, $location, Bike) {
    
    angular.extend($scope, {
        view: {
            list: true,
            addBike: false
        },
        bike: {
            make: null,
            model: null,
            type: null,
            size: null,
            year: null,
            price: null,
            color: null,
            gender: null
        }
    });

    function init() {
        Bike.getAllBikes().then(function(success) {
            $scope.bikes = success;
        });
    };

}]);
