var mainController = pfcmApp.controller('mainController', ['$scope', '$http', function($scope, $http){
    'use strict';

    $scope.user = {
        authenticated: false
    };

    $scope.login = function() {
        $http.post('/login', {username: "test", password: "test"}).success(function() {
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