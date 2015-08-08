function Class(id, name, hitDie, skillsPerLevel, classSkills, baseAttackBonus, fortSave, reflexSave, willSave, getAbilities, getSpells) {
    this.id = id;
    this.name = name;
    this.hitDie = hitDie;
    this.skillsPerLevel = skillsPerLevel;
    this.classSkills = classSkills;
    this.baseAttackBonus = baseAttackBonus;
    this.fortSave = fortSave;
    this.reflexSave = reflexSave;
    this.willSave = willSave;
    this.getAbilities = getAbilities;
    this.getSpells = getSpells;
}

Class.BaseAttackBonusStrength = {
    STRONG: 1,
    MEDIUM: 2,
    WEAK: 3
};

Class.SaveStrength = {
    STRONG: 1,
    WEAK: 2
};

Class.SaveType = {
    FORT_SAVE: 1,
    REFLEX_SAVE: 2,
    WILL_SAVE: 3
};

Class.prototype.getBaseAttackBonus = function(level) {
    switch (this.baseAttackBonus) {
        case (Class.BaseAttackBonusStrength.STRONG):
            return level;
        case (Class.BaseAttackBonusStrength.MEDIUM):
            return Math.floor(level * 0.75);
        case (Class.BaseAttackBonusStrength.WEAK):
        default:
            return Math.floor(level / 2);
    }
};

Class.prototype.getSave = function(saveType, level) {
    var save;
    switch(saveType){
        case Class.SaveType.FORT_SAVE:
            save = this.fortSave;
            break;
        case Class.SaveType.REFLEX_SAVE:
            save = this.reflexSave;
            break;
        case Class.SaveType.WILL_SAVE:
            save = this.willSave;
            break;
        default:
            console.error('Invalid save type %s', saveType);
            return 0;
    }
    
    switch(save) {
        case Class.SaveStrength.STRONG:
            return 2 + Math.floor(level / 2);
        case Class.SaveStrength.WEAK:
        default:
            return Math.floor(level / 3);
    }
};