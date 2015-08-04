angular.module('PFCM.equipmentAbilities', []).controller('EquipmentAbilitiesController', EquipmentAbilitiesController);

function EquipmentAbilitiesController(characterService) {
    this.character = characterService.character;
    this.characterAbilities = characterService.getCharacterAbilities();

    this.deleteItem = function(index) {
        this.character.equipment.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };

    this.deleteFeat = function(index) {
        this.character.feats.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };
}