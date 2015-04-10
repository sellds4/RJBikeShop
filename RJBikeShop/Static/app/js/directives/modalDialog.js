'use strict';

angular.module('RJBikeApp.directives')
    .directive('modalDialog', function() {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            templateUrl: './Static/app/partials/modal-template.html',
            link: function(scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                $('.ng-modal-overlay').height($(document).height());
                scope.hideModal = function() {
                    scope.show = false;
                };
                scope.$watch('show', function(result) {
                    result ? $('body').css('overflow', 'hidden') : $('body').css('overflow', 'visible');
                });
                scope.$on('close-modal', function() {
                    scope.hideModal();
                });
            }
        };
    });
