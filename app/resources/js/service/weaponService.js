pfcmServices.factory('weaponService', function(characterService) {
    return {
        getAttackBonus: function() {
            return characterService.getBaseAttackBonus() + characterService.getAttributeModifier(Attribute.STRENGTH) +
                characterService.getCalculatedEffect('weaponAttack');
        },

        getDamageString: function(weapon) {
            var dmg = weapon.damage;
            var strengthBonus = characterService.getAttributeModifier(Attribute.STRENGTH);
            var dmgBonus = (weapon.hasProperty('twoHanded')) ? Math.floor(strengthBonus * 1.5) : strengthBonus;
            dmgBonus += characterService.getCalculatedEffect('weaponDamage');

            return dmgBonus == 0 ? dmg : dmg + " + " + dmgBonus;
        }
    };
});