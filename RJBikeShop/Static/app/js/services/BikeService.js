'use strict';

angular.module('RJBikeApp.services').service('BikeService', ['$q', '$http', function($q, $http) {
    
    // GETS
    this.getAllBikes = function() {
        var d = $q.defer();
        $http.post('/api/Bike/Register', req).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    // POSTS


}]);
