'use strict';

angular.module('RJBikeApp.directives')
    .directive('dashboardHeader', ['$location', 'LoginService', function ($location, Login) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./Static/app/partials/page-bar.html',
            link: function (scope, elem, attrs) {
                
            }
        };
    }]);
