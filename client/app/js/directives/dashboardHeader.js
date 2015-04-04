'use strict';

angular.module('RJBikeApp.directives', [])
    .directive('dashboardHeader', ['$location', 'LoginService', function ($location, Login) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./partials/dashboard-header.html',
            link: function (scope, elem, attrs) {
                scope.logout = function() {
                    Login.logout.then(function() {
                        $location.path('/');
                    });
                }
            }
        };
    }]);
