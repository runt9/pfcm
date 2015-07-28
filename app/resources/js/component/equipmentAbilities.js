angular.module('PFCM.equipmentAbilities', []).controller('EquipmentAbilitiesController', EquipmentAbilitiesController);

function EquipmentAbilitiesController(characterService) {
    this.character = characterService.character;
    this.characterAbilities = characterService.getCharacterAbilities();
}