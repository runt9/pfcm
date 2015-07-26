var pfcmApp = angular.module('PFCM', [
    'ui.bootstrap',
    'ngNewRouter',
    'PFCM.controllers',
    'PFCM.services',
    // Components
    'PFCM.statsSkills',
    'PFCM.equipmentAbilities',
    'PFCM.spells',
    'PFCM.loreBackstory'
]);

pfcmApp.config(function($componentLoaderProvider) {
    $componentLoaderProvider.setTemplateMapping(function(name) {
        return name + '.html';
    });
});

var pfcmControllers = angular.module('PFCM.controllers', []);
var pfcmServices = angular.module('PFCM.services', []);