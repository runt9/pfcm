function Feat(id, name, description, detail, statEffects) {
    Ability.call(this, id, name, description, detail, statEffects);
}

Feat.prototype = Object.create(Ability.prototype);
Feat.prototype.constructor = Feat;