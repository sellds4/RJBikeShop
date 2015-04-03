'use strict';

RJBikeApp.factory('authInterceptorService', ['$q', '$location', 'localStorageService',
    function ($q, $location, localStorage) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorage.get('sessionData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.access_token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);