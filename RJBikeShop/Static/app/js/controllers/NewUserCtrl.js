'use strict';

angular.module('RJBikeApp.controllers').controller('NewUserCtrl', ['$scope', '$location', 'AccountService',
    function($scope, $location, Account) {

    angular.extend($scope, {
        doingRequest: false
    });

    $scope.submit = function() {
        var s = $scope,
            req = {
            FirstName: s.firstname,
            LastName: s.lastname,
            Email: s.email,
            Password: s.password,
            ConfirmPassword: s.confirmpassword
        };
        s.doingRequest = true;
        Account.register(req).then(function(success) {
            alert("Account created!")
            $location.path('/dashboard');
        }, function(error) {
            alert(error);
        });
        s.doingRequest = false;
    };
}]);
