'use strict';

angular.module('RJBikeApp.controllers').controller('LoginCtrl', ['$scope', '$location', 'LoginService',
    function($scope, $location, Login) {
    
    $scope.submit = function() {
        var req = "userName=" + $scope.username + "&password=" + $scope.password + "&grant_type=password";
        Login.login(req).then(function(success) {
            $location.path('/campus');
        }, function(error) {
            alert(error);
        });
    };
}]);
