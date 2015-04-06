'use strict';

angular.module('RJBikeApp.directives')
    .directive('dashboardMenuBar', ['$rootScope', '$location', function ($rootScope, $location) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./Static/app/partials/dashboard-menu-bar.html',
            link: function (scope, elem, attrs) {
                scope.goToNewUser = function() {
                    $location.path('/newuser');
                };
                scope.showModal = function() {
                    $rootScope.$broadcast('show-modal');
                };
                scope.toggleSold = function() {
                    scope.view.showSold = !scope.view.showSold;
                };
            }
        };
    }]);
