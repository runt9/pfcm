angular.module('PFCM.statsSkills', []).controller('StatsSkillsController', StatsSkillsController);

function StatsSkillsController(characterService, weaponService) {
    this.character = characterService.character;

    //<editor-fold desc="Add Weapons/Effects">
    this.addingWeapon = false;
    this.weaponToAdd = "";
    this.addingEffect = false;
    this.effectToAdd = "";

    this.allWeapons = function() {
        return _.difference(weaponRepository.repository, this.character.weapons);
    };

    this.allEffects = function() {
        return _.difference(effectRepository.repository, this.character.effects);
    };

    this.addWeapon = function(weapon) {
        this.character.weapons.push(weapon);
        this.addingWeapon = false;
        this.weaponToAdd = "";
        characterService.recalculateCalculatedEffects();
    };

    this.cancelAddingWeapon = function() {
        this.addingWeapon = false;
        this.weaponToAdd = "";
    };

    this.deleteWeapon = function(index) {
        this.character.weapons.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };

    this.addEffect = function(effect) {
        this.character.effects.push(effect);
        this.addingEffect = false;
        this.effectToAdd = "";
        characterService.recalculateCalculatedEffects();
    };

    this.cancelAddingEffect = function() {
        this.addingEffect = false;
        this.effectToAdd = "";
    };

    this.deleteEffect = function(index) {
        this.character.effects.splice(index, 1);
        characterService.recalculateCalculatedEffects();
    };
    //</editor-fold>

    //<editor-fold desc="Hardcoded Data">
    this.alignments = [
        'Lawful Good',
        'Neutral Good',
        'Chaotic Good',
        'Lawful Neutral',
        'Neutral',
        'Chaotic Neutral',
        'Lawful Evil',
        'Neutral Evil',
        'Chaotic Evil'
    ];

    this.races = [
        'Half-Elf',
        'Elf',
        'Human'
    ];

    this.classes = classRepository.repository;
    this.attributes = Attribute;
    this.skills = Skill;
    //</editor-fold>

    //<editor-fold desc="Service Calls">
    this.translateModifier = function(modifier) {
        return modifier > 0 ? '+' + modifier : modifier;
    };

    this.camelCase = function(str) {
        return _.camelCase(str);
    };

    this.getAttributeModifier = function(attribute)  {
        return this.translateModifier(characterService.getAttributeModifier(attribute));
    };

    this.getBaseAttackBonus = function() {
        return this.translateModifier(characterService.getBaseAttackBonus());
    };

    this.getCombatManeuverBonus = function() {
        return this.translateModifier(characterService.getCombatManeuverBonus());
    };

    this.getFortSave = function() {
        return this.translateModifier(characterService.getFortSave());
    };

    this.getReflexSave = function() {
        return this.translateModifier(characterService.getReflexSave());
    };

    this.getWillSave = function() {
        return this.translateModifier(characterService.getWillSave());
    };
    
    this.getSkillModifier = function(skill) {
        return this.translateModifier(characterService.getSkillModifier(skill));
    };

    this.getInitiative = function()  {
        return this.translateModifier(characterService.getInitiative());
    };

    this.getWeaponAttackBonus = function() {
        return this.translateModifier(weaponService.getAttackBonus());
    };

    this.getAttributeScore = function(attribute)  {
        return characterService.getAttributeScore(attribute);
    };

    this.getTotalLevel = function()  {
        return characterService.getTotalLevel();
    };

    this.getCombatManeuverDefense = function() {
        return characterService.getCombatManeuverDefense();
    };

    this.getNormalArmorClass = function() {
        return characterService.getNormalArmorClass(0);
    };

    this.getTouchArmorClass = function() {
        return characterService.getTouchArmorClass();
    };

    this.getFlatFootedArmorClass = function() {
        return characterService.getFlatFootedArmorClass();
    };

    this.isClassSkill = function(skill) {
        return characterService.isClassSkill(skill);
    };

    this.getWeaponDamageString = function(weapon) {
        return weaponService.getDamageString(weapon);
    };

    this.getSpeed = function() {
        return characterService.getSpeed();
    };
    //</editor-fold>
}