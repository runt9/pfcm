angular.module('PFCM.equipmentAbilities', []).controller('EquipmentAbilitiesController', EquipmentAbilitiesController);

function EquipmentAbilitiesController(characterService) {
    this.character = characterService.character;
    this.characterAbilities = characterService.getCharacterAbilities();

    //<editor-fold desc="Add Feats">
    this.addingFeat = false;
    this.featToAdd = "";

    this.allFeats = function() {
        return _.difference(featRepository.repository, this.character.feats);
    };
    
    this.addFeat = function(feat) {
        this.character.feats.push(feat);
        this.addingFeat = false;
        this.featToAdd = "";
        characterService.recalculateCalculatedEffects();
    };

    this.cancelAddingFeat = function() {
        this.addingFeat = false;
        this.featToAdd = "";
    };
    //</editor-fold>

    this.deleteItem = function(index) {
        this.character.equipment.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };

    this.deleteFeat = function(index) {
        this.character.feats.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };
}