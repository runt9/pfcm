function Weapon(id, name, description, weight, crit, range, damage, damageType, properties, statEffects) {
    Item.call(this, id, name, description, weight, statEffects);
    this.crit = crit;
    this.range = range;
    this.damage = damage;
    this.damageType = damageType;
    this.properties = properties;
}

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.hasProperty = function(property) {
    return _.indexOf(this.properties, property) > -1;
};