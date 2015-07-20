var mainController = pfcmApp.controller('mainController', ['$scope', '$http', function($scope, $http){
    'use strict';

    $scope.user = {
        authenticated: false
    };

    $scope.login = function() {
        $http.get('/login').success(function() {
            $scope.user.authenticated = true;
        }).error(function() {
            $scope.user.authenticated = false;
        });
    };

    $scope.logout = function() {
        $scope.user.authenticated = false;
        $http.get('/logout');
    };
}]);