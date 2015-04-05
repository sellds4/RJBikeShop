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
        },
        modalShown: false
    });

    var addNewBike;

    function init() {
        getAllBikes()
    };

    function getAllBikes() {
        Bike.getAllBikes().then(function(success) {
            $scope.bikes = success.reverse();
        });
    };

    $scope.deleteBike = function(bikeID) {
        var confirmDelete = confirm("Are you sure you want to delete this bike?");
        if(confirmDelete) {
            Bike.deleteBike(bikeID).then(function() {
                getAllBikes();
                alert("The selected bike has been deleted.");
            });
        } else {
            return;
        }
    };

    $scope.toggleModal = function(bikeObj) {
        var s = $scope;
        s.modalShown = !s.modalShown;
        if(bikeObj) {
            addNewBike = true;
            for(var key in bikeObj) {
                s.newBike[key] = bikeObj[key];
            }
        } else {
            addNewBike = false;
            for(var keys in s.newBike) {
                s.newBike[keys] = null;
            }
        }
    };

    $scope.submitBike = function() {
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
        if(addNewBike) {
            Bike.addBike(bikeObj).then(function(data) {
                getAllBikes();
                alert("Bike Added!");
                hideModal();
            });
        } else {
            var confirmDelete = confirm("Are the changes to this bike correct?");
            if(confirmDelete) {
                Bike.editBike(editBike).then(function() {
                    getAllBikes();
                    alert("The bike is fixed!");
                });
            } else {
                return;
            }
        }
    }

    init();

}]);
