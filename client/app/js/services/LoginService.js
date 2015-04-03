'use strict';

angular.module('RJBikeApp.services').service('LoginService', ['$q', '$http', 'localStorageService',
    function($q, $http, localStorage) {
    
    this.login = function(req) {
        var d = $q.defer();
        $http.post('/token', req).success(function(data) {
            localStorage.set('sessionData', data);
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    this.logout = function() {
        var d = $q.defer();
        $http.post('/api/Account/Logout').success(function(data) {
            localStorage.clearAll('session');
            d.resolve(data);
        }).error(function(error) {
            d.reject(error);
        });
        return d.promise;
    };

}]);
