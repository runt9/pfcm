angular.module('PFCM.loreBackstory', []).controller('LoreBackstoryController', LoreBackstoryController);

function LoreBackstoryController(characterService) {
    this.character = characterService.character;
}