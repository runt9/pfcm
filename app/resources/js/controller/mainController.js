var mainController = pfcmApp.controller('mainController', ['$scope', '$http', '$modal', '$router', '$location', function($scope, $http, $modal, $router, $location) {
    $router.config([
        {path: '/', redirectTo: 'statsSkills'},
        {path: '/statsSkills', component: 'statsSkills'},
        {path: '/equipmentAbilities', component: 'equipmentAbilities'},
        {path: '/spells', component: 'spells'},
        {path: '/loreBackstory', component: 'loreBackstory'}
    ]);

    $scope.isActive = function(viewLocation) {
        return viewLocation == $location.path();
    };

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
        // TODO: $scope.user.authenticated = false;
        $scope.user.authenticated = true;
        $scope.loading = false;
    });

    $scope.login = function() {
        $scope.user = {
            username: '',
            password: ''
        };

        $modal.open({
            templateUrl: 'loginModal.html',
            backdrop: true,
            size: 'sm',
            controller: function($scope, $modalInstance, user) {
                $scope.error = '';
                $scope.user = user;

                $scope.submit = function() {
                    $scope.loading = true;
                    $http.post('/login', {username: $scope.user.username, password: $scope.user.password}).success(function(response) {
                        $scope.loading = false;
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
        $scope.loading = true;
        $http.get('/logout').then(function() {
            $scope.loading = false;
        });
    };
}]);