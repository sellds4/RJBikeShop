'use strict';

angular.module('RJBikeApp.directives')
    .directive('dashboardMenuBar', ['$location', function ($location) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./Static/app/partials/dashboard-control.html',
            link: function (scope, elem, attrs) {
                scope.goToNewUser = function() {
                    $location.path('/newuser');
                };
            }
        };
    }]);
