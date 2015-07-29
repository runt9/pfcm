angular.module('PFCM.spells', []).controller('SpellsController', SpellsController);

function SpellsController(characterService) {
    this.character = characterService.character;
    this.spells = characterService.getSpells();

    this.levelHasOpenSpellSlots = function(spellLevelInfo) {
        return spellLevelInfo.slots - spellLevelInfo.spells.length > 0;
    };

    this.removeSpell = function(level, index) {
        this.spells[level].spells.splice(index, 1);
    };
}