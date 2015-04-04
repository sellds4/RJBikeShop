'use strict';

angular.module('RJBikeApp.controllers').controller('NewUserCtrl', ['$scope', '$location', 'AccountService',
    function($scope, $location, Account) {

    $scope.submit = function() {
        var s = $scope,
            req = {
            FirstName: s.firstname,
            LastName: s.lastname,
            Email: s.email,
            Password: s.password,
            ConfirmPassword: s.confirmpassword
        };
        Account.register(req).then(function(success) {
            $location.path('/dashboard');
        }, function(error) {
            alert(error);
        });
    };
}]);
