'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$location', 'BikeService',
    function($scope, $location, Bike) {
    
    angular.extend($scope, {
        bikes: [],
        view: {
            list: true,
            addBike: false
        },
        newBike: {
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

    $scope.addBike = function() {
        var s = $scope;
        var bikeObj = {
                Make: s.newBike.make,
                Model: s.newBike.model,
                FrameSize: s.newBike.size,
                Year: s.newBike.year,
                Price: s.newBike.price,
                Cost: s.newBike.cost,
                BikeType: s.newBike.type,
                Color: s.newBike.color,
                Gender: s.newBike.gender
        };
        Bike.addBike(bikeObj).then(function(data) {
            $scope.bikes.unshift(data);
            for(var key in s.newBike) {
                s.newBike[key] = null;
            }
        });
    };

    $scope.editBike = function(editBike) {
        var confirmDelete = confirm("Are the changes to this bike correct?");
        if(confirmDelete) {
            Bike.editBike(editBike).then(function() {
                
            });
        } else {
            return;
        }
    };

    $scope.deleteBike = function(bikeID) {
        var confirmDelete = confirm("Are you sure you want to delete this bike?");
        if(confirmDelete) {
            Bike.deleteBike(bikeID).then(function() {
                
            });
        } else {
            return;
        }
    };

}]);
