var mainController = pfcmApp.controller('mainController', ['$scope', '$http', '$modal', '$router', '$location', function($scope, $http, $modal, $router, $location) {
    // Variables we'll need throughout
    $scope.characterSelected = false;
    $scope.characterSelect = "";
    $scope.loading = true;
    $scope.user = {
        authenticated: false,
        username: ''
    };

    // Router config
    $router.config([
        {path: '/statsSkills', component: 'statsSkills'},
        {path: '/equipmentAbilities', component: 'equipmentAbilities'},
        {path: '/spells', component: 'spells'},
        {path: '/loreBackstory', component: 'loreBackstory'}
    ]);

    // Actions to perform at the beginning of controller instantiation
    $http.get('/authenticate').success(function(response) {
        $scope.user.username = response;
        $scope.user.authenticated = true;
        $scope.loading = false;
    }).error(function() {
        $scope.user.authenticated = false;
        $scope.loading = false;
    });

    // Helper functions
    $scope.isActive = function(viewLocation) {
        return viewLocation == $location.path();
    };

    $scope.characterSelectChange = function() {
        if ($scope.characterSelect != "") {
            $scope.characterSelected = true;
        }
    };

    // Auth handling
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
        $scope.characterSelected = false;
        $scope.user.authenticated = false;
        $scope.loading = true;
        $http.get('/logout').then(function() {
            $scope.loading = false;
        });
    };
}]);