pfcmControllers.controller('MainController', MainController);

function MainController($scope, $router, $http, $modal, $location, characterService) {
    // Variables we'll need throughout
    //TODO $scope.characterSelected = false;
    $scope.characterSelected = true;
    $scope.characterSelect = "";
    $scope.loading = true;
    $scope.user = {
        authenticated: false,
        username: ''
    };

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
        //TODO $scope.user.authenticated = false;
        $scope.user.authenticated = true;
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

    $scope.character = new Character({
        playerName: 'Alex',
        characterName: 'Ren\'Del Treeborne',
        alignment: 'Neutral',
        race: 'Half-Elf',
        experience: 19800,
        gender: 'Male',
        age: 33,
        height: '6\'6"',
        weight: 185,
        hair: 'Black',
        eyes: 'Green',
        deity: 'N/A',
        homeland: 'Srolai Forest',
        classes: [
            {id: 1, level: 1}
        ],
        attributes: {
            strength: {score: 16, temp: 0},
            dexterity: {score: 14, temp: 0},
            constitution: {score: 10, temp: 0},
            intelligence: {score: 10, temp: 0},
            wisdom: {score: 17, temp: 0},
            charisma: {score: 10, temp: 0}
        },
        maxHitPoints: 40,
        currentHitPoints: 40,
        tempHitPoints: 0,
        weapons: [1],
        skills: {
            acrobatics: 1,
            appraise: 0,
            bluff: 1,
            climb: 1,
            craft: 0,
            diplomacy: 0,
            disableDevice: 0,
            disguise: 1,
            escapeArtist: 0,
            fly: 0,
            handleAnimal: 0,
            heal: 0,
            intimidate: 1,
            knArcana: 1,
            knDungeoneering: 1,
            knEngineering: 1,
            knGeography: 0,
            knHistory: 0,
            knLocal: 1,
            knNature: 0,
            knNobility: 1,
            knPlanes: 2,
            knReligion: 0,
            linguistics: 0,
            perception: 0,
            perform: 0,
            profession: 3,
            ride: 0,
            senseMotive: 0,
            sleightOfHand: 1,
            spellcraft: 0,
            stealth: 0,
            survival: 0,
            swim: 0,
            useMagicDevice: 1
        },
        equipment: [
            {qty: 1, item: 1, type: ItemType.ITEM},
            {qty: 500, item: 2, type: ItemType.ITEM},
            {qty: 1, item: 1, type: ItemType.ARMOR}
        ],
        feats: [1, 2],
        spells: [],
        backstory: '',
        effects: [1, 2]
    });
    characterService.setCharacter($scope.character);

    $scope.logCharacter = function() {
        console.log($scope.character);
    };
}