pfcmServices.factory('weaponService', function(characterService) {
    return {
        getAttackBonus: function() {
            return characterService.getBaseAttackBonus() + characterService.getAbilityModifier('strength') +
                characterService.getCalculatedEffect('weaponAttack');
        },

        getDamageString: function(weapon) {
            var dmg = weapon.damage;
            var dmgBonus = (weapon.hasProperty('twoHanded')) ?
                Math.floor(characterService.getAbilityModifier('strength') * 1.5) :
                characterService.getAbilityModifier('strength') +
                characterService.getCalculatedEffect('weaponDamage');

            return dmgBonus == 0 ? dmg : dmg + " + " + dmgBonus;
        }
    };
});