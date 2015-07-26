var Weapon = function(id, name, crit, range, damage, damageType, weight, properties) {
    this.id = id;
    this.name = name;
    this.crit = crit;
    this.range = range;
    this.damage = damage;
    this.damageType = damageType;
    this.weight = weight;
    this.properties = properties;
};

Weapon.prototype.hasProperty = function(property) {
    return _.indexOf(this.properties, property) > -1;
};