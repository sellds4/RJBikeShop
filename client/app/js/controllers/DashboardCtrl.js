'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'BikeService',
    function($scope, $rootScope, $location, Bike) {
    
    angular.extend($scope, {
        bikes: [],
        view: {
            list: true
        },
        newBike: {},
        modalShown: false
    });

    var addNewBike;

    function init() {
        getAllBikes();
        $scope.$on('show-modal', function() {
            $scope.toggleModal();
        });
    }

    function getAllBikes() {
        Bike.getAllBikes().then(function(success) {
            $scope.bikes = success.reverse();
        });
    }

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
            addNewBike = false;
            for(var key in bikeObj) {
                s.newBike[key] = bikeObj[key];
            }
        } else {
            addNewBike = true;
            for(var keys in s.newBike) {
                s.newBike[keys] = null;
            }
        }
    };

    $scope.submitBike = function() {
        var s = $scope;
        var bikeObj = s.newBike;
        bikeObj.Make = bikeObj.MakeString;
        bikeObj.BikeType = bikeObj.BikeTypeString;
        bikeObj.Color = bikeObj.ColorString;
        bikeObj.Gender = bikeObj.GenderString;
        if(addNewBike) {
            Bike.addBike(bikeObj).then(function(data) {
                getAllBikes();
                alert("Bike Added!");
                $rootScope.$broadcast('close-modal');
            });
        } else {
            var confirmDelete = confirm("Are the changes to this bike correct?");
            if(confirmDelete) {
                Bike.editBike(bikeObj).then(function() {
                    getAllBikes();
                    alert("The bike is fixed!");
                    $rootScope.$broadcast('close-modal');
                });
            } else {
                return;
            }
        }
    }

    init();

}]);
