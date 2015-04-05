'use strict';
 
var RJBikeApp = angular.module('RJBikeApp', [
    'ngRoute',
    'ngCookies',
    'RJBikeApp.controllers',
    'RJBikeApp.services',
    'RJBikeApp.directives',
    'LocalStorageModule'
]);

angular.module('RJBikeApp.controllers', []);
angular.module('RJBikeApp.directives', []);
angular.module('RJBikeApp.services', []);

RJBikeApp.config(function($routeProvider, $locationProvider) {
    var loginResolve = ['$q', '$location', 'localStorageService', function($q, $location, localStorage) {
        if (localStorage.get('sessionData')) {
            return $q.when(true);
        } else {
            return $q.reject($location.path('/'));
        }
    }];
    
    $routeProvider
        .when('/', {
            templateUrl: './Static/app/partials/login.html',
            controller: 'LoginCtrl',
            resolve: {
                loggedInResolve: ['$q', '$location', 'localStorageService', function($q, $location, localStorage) {
                    if (!localStorage.get('sessionData')) {
                        return $q.when(true);
                    } else {
                        return $q.reject($location.path('/dashboard'));
                    }
                }]
            }
        })
        .when('/newuser', {
            templateUrl: './Static/app/partials/newuser.html',
            controller: 'NewUserCtrl',
            resolve:{
                loginResolve: loginResolve
            }
        })
        .when('/dashboard', {
            templateUrl: './Static/app/partials/dashboard.html',
            controller: 'DashboardCtrl',
            resolve:{
                loginResolve: loginResolve
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

RJBikeApp.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-XSRF-TOKEN'] = $cookies['XSRF-TOKEN'];
});

RJBikeApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});