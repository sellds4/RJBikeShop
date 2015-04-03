'use strict';

angular.module('RJBikeApp.directives', [])
    .directive('dashboardHeader', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./partials/dashboard-header.html',
            link: function (scope, elem, attrs) {

            }
        };
    });
