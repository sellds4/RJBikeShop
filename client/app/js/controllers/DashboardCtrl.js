'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$location', 'BikeService',
    function($scope, $location, Bike) {
    
    function init() {
    	Bike.getAllBikes().then(function(success) {
    		$scope.bikes = success;
    	});
    };

}]);
