var mainController = pfcmApp.controller('mainController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
    $scope.loading = true;
    $scope.user = {
        authenticated: false,
        username: ''
    };
    $http.get('/authenticate').success(function(response) {
        $scope.user.username = response;
        $scope.user.authenticated = true;
        $scope.loading = false;
    }).error(function() {
        $scope.loading = false;
    });

    $scope.login = function() {
        $scope.user = {
            username: '',
            password: ''
        };

        $modal.open({
            templateUrl: 'login_modal.html',
            backdrop: true,
            size: 'sm',
            controller: function($scope, $modalInstance, user) {
                $scope.loading = false;
                $scope.error = '';
                $scope.user = user;

                $scope.submit = function() {
                    $scope.loading = true;
                    $http.post('/login', {username: $scope.user.username, password: $scope.user.password}).success(function(response) {
                        $modalInstance.close(response);
                    }).error(function(response) {
                        $scope.error = response;
                        $scope.loading = false;
                    });
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss(false);
                }
            },
            resolve: {
                user: function() {
                    return $scope.user;
                }
            }
        }).result.then(function(result) {
            if (result) {
                $scope.user.username = result;
                $scope.user.authenticated = true;
            }
        });
    };

    $scope.logout = function() {
        $scope.user.authenticated = false;
        $http.get('/logout');
    };
}]);