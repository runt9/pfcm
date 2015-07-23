var pfcmApp = angular.module('PFCM', [
    'ui.bootstrap',
    'ngNewRouter',
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