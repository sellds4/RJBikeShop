'use strict';

angular.module('RJBikeApp.services').service('BikeService', ['$q', '$http', function($q, $http) {
    
    // GETS
    this.getAllBikes = function() {
        var d = $q.defer();
        $http.get('/api/Bike').success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    this.getPagedBikes = function(pageNum, pageSize, getSoldBikes) {
        var d = $q.defer(),
            url = '?pageNum=' + pageNum + '&pageSize=' + pageSize + '&getSoldBikes=' + getSoldBikes;
        $http.get('/api/Bike/Pages' + url).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    this.getBikeDataValues = function() {
        var d = $q.defer();
        $http.get('/api/Bike/BikeData').success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    // POSTS
    this.addBike = function(bike) {
        var d = $q.defer();
        $http.post('/api/Bike', bike).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    // PUTS
    this.editBike = function(bike) {
        var d = $q.defer(),
            url = '/api/Bike/' + bike.Id;
        $http.put(url, bike).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    // DELETES
    this.deleteBike = function(bikeID) {
        var d = $q.defer(),
            url = '/api/Bike/' + bikeID;
        $http.delete(url).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

}]);
