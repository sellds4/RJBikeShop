'use strict';

angular.module('RJBikeApp.services').service('AccountService', ['$q', '$http', function($q, $http) {
    
    // GETS


    // POSTS
    this.register = function(req) {
        var d = $q.defer();
        $http.post('/api/Account/Register', req).success(function(data) {
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

}]);
