'use strict';

angular.module('RJBikeApp.directives')
    .directive('pageBar', ['$location', function ($location) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./Static/app/partials/page-bar.html',
            link: function (scope, elem, attrs) {
                
            }
        };
    }]);
