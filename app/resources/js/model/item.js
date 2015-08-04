function Item(id, name, description, weight, statEffects) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.statEffects = statEffects;
}

var ItemType = {
    ITEM: 1,
    ARMOR: 2,
    WEAPON: 3
};