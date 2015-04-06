'use strict';

angular.module('RJBikeApp.controllers').controller('LoginCtrl', ['$scope', '$location', 'LoginService',
    function($scope, $location, Login) {

    angular.extend($scope, {
        doingRequest: false
    });
    
    $scope.submit = function() {
    	$scope.doingRequest = true;
        var req = "userName=" + $scope.username + "&password=" + $scope.password + "&grant_type=password";
        Login.login(req).then(function(success) {
            $location.path('/dashboard');
        }, function(error) {
            alert(error.error_description);
        });
        $scope.doingRequest = false;
    };
}]);
