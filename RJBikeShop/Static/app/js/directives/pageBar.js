'use strict';

angular.module('RJBikeApp.directives')
    .directive('pageBar', ['$location', function ($location) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'./Static/app/partials/page-bar.html',
            link: function (scope, elem, attrs) {
                var s = scope;
                function createPageArray(selectedPage) {
                    var numOfPages = s.totalPages;
                    s.pageArray = [];
                    for(var i = 1; i <= numOfPages; i++) {
                        s.pageArray.push(i);
                    }
                }
                s.pageClicked = function(pageNum) {
                    if(pageNum < 1 || pageNum > s.totalPages) {
                        return;
                    }
                    s.getPagedBikes(pageNum, s.pageSize, s.showSold)
                };
                scope.$on('create-array', function() {
                    createPageArray();
                });
            }
        };
    }]);
