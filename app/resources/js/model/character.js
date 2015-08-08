function Character(data) {
    this.playerName = data.playerName;
    this.characterName = data.characterName;
    this.alignment = data.alignment;
    this.race = data.race;
    this.experience = data.experience;
    this.gender = data.gender;
    this.age = data.age;
    this.height = data.height;
    this.weight = data.weight;
    this.hair = data.hair;
    this.eyes = data.eyes;
    this.deity = data.deity;
    this.homeland = data.homeland;
    this.classes = data.classes;
    this.attributes = data.attributes;
    this.maxHitPoints = data.maxHitPoints;
    this.currentHitPoints = data.currentHitPoints;
    this.tempHitPoints = data.tempHitPoints;
    this.weapons = data.weapons;
    this.skills = data.skills;
    this.equipment = data.equipment;
    this.feats = data.feats;
    this.spells = data.spells;
    this.backstory = data.backstory;
    this.effects = data.effects;

    // Massive effects object used to track additional calculated effects across any stat
    this.calculatedEffects = {};
}