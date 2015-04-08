'use strict';

angular.module('RJBikeApp.controllers').controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'BikeService',
    function($scope, $rootScope, $location, Bike) {
    
    angular.extend($scope, {
        bikeData: null,
        currentPageNum: 1,
        pageSize: 24,
        totalPages: null,
        view: {
            list: true
        },
        showSold: false,
        newBike: {},
        modalShown: false,
        doingRequest: false
    });

    var addNewBike;

    function init() {
        var s = $scope;
        s.getPagedBikes(1, s.pageSize, s.showSold);
        s.$on('show-modal', function() {
            s.toggleModal();
        });
        Bike.getBikeDataValues().then(function(success) {
            s.bikeDataValues = success;
        });
    }

    $scope.getPagedBikes = function(pageNum, pageSize, getSoldBikes) {
        var s = $scope;
        if(pageNum <= s.totalPages - 4) {
            s.currentPageNum = pageNum;
        }
        s.pageSize = pageSize;
        Bike.getPagedBikes(pageNum, pageSize, getSoldBikes).then(function(success) {
            s.bikeData = success;
            s.totalPages = success.PageCount;
        });
    };

    $scope.deleteBike = function(bikeID) {
        var s = $scope;
        var confirmDelete = confirm("Are you sure you want to delete this bike?");
        s.doingRequest = true;
        if(confirmDelete) {
            Bike.deleteBike(bikeID).then(function() {
                s.getPagedBikes(s.currentPageNum, s.pageSize, s.showSold);
                alert("The selected bike has been deleted.");
                s.doingRequest = false;
            });
        } else {
            s.doingRequest = false;
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
        s.doingRequest = true;
        var bikeObj = {};
        for(var key in s.newBike) {
            if(key === 'Id') {
                continue;
            } else {
                bikeObj[key] = s.newBike[key];
            }
        }
        bikeObj.Make = bikeObj.MakeString;
        bikeObj.BikeType = bikeObj.BikeTypeString;
        bikeObj.Color = bikeObj.ColorString;
        bikeObj.Gender = bikeObj.GenderString;
        if(addNewBike) {
            bikeObj.Cost = bikeObj.Price * .8;
            bikeObj.Sold = bikeObj.Sold ? bikeObj.Sold : false;
            Bike.addBike(bikeObj).then(function() {
                s.getPagedBikes(1, s.pageSize, bikeObj.Sold);
                s.showSold = bikeObj.Sold;
                alert("Bike Added!");
                $rootScope.$broadcast('close-modal');
                s.doingRequest = false;
            });
        } else {
            bikeObj.Id = s.newBike.Id;
            var confirmDelete = confirm("Are the changes to this bike correct?");
            if(confirmDelete) {
                Bike.editBike(bikeObj).then(function() {
                    s.getPagedBikes(1, s.pageSize, bikeObj.Sold);
                    s.showSold = bikeObj.Sold;
                    alert("The bike is fixed!");
                    $rootScope.$broadcast('close-modal');
                    s.doingRequest = false;
                });
            } else {
                $scope.doingRequest = false;
                return;
            }
        }
    }

    init();

}]);
