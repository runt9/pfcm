function Armor(id, name, description, weight, armorClassBonus, armorCheckPenalty) {
    var statEffects = {
        normalArmorClass: armorClassBonus,
        flatFootedArmorClass: armorClassBonus,
        climb: armorCheckPenalty,
        swim: armorCheckPenalty,
        acrobatics: armorCheckPenalty,
        disableDevice: armorCheckPenalty,
        escapeArtist: armorCheckPenalty,
        fly: armorCheckPenalty,
        ride: armorCheckPenalty,
        sleightOfHand: armorCheckPenalty,
        stealth: armorCheckPenalty
    };

    Item.call(this, id, name, description, weight, statEffects);
}

Armor.prototype = Object.create(Item.prototype);
Armor.prototype.constructor = Armor;