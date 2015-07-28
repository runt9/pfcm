function Feat(id, name, description, detail) {
    Ability.call(this, id, name, description, detail);
}

Feat.prototype = Object.create(Ability.prototype);
Feat.prototype.constructor = Feat;