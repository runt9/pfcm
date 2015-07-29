angular.module('PFCM.statsSkills', []).controller('StatsSkillsController', StatsSkillsController);

function StatsSkillsController(characterService, weaponService) {
    this.character = characterService.character;

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

    this.abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    
    this.races = [
        'Half-Elf',
        'Elf',
        'Human'
    ];

    this.classes = [
        'Barbarian',
        'Druid',
        'Fighter'
    ];
    
    this.skills = [
        'Acrobatics',
        'Appraise',
        'Bluff',
        'Climb',
        'Craft',
        'Diplomacy',
        'Disable Device',
        'Disguise',
        'Escape Artist',
        'Fly',
        'Handle Animal',
        'Heal',
        'Intimidate',
        'Kn Arcana',
        'Kn Dungeoneering',
        'Kn Engineering',
        'Kn Geography',
        'Kn History',
        'Kn Local',
        'Kn Nature',
        'Kn Nobility',
        'Kn Planes',
        'Kn Religion',
        'Linguistics',
        'Perception',
        'Perform',
        'Profession',
        'Ride',
        'Sense Motive',
        'Sleight of Hand',
        'Spellcraft',
        'Stealth',
        'Survival',
        'Swim',
        'Use Magic Device'
    ];

    this.translateModifier = function(modifier) {
        return modifier > 0 ? '+' + modifier : modifier;
    };

    this.camelCase = function(str) {
        return _.camelCase(str);
    };

    this.deleteWeapon = function(index) {
        this.character.weapons.splice(index, 1);
    };

    this.getAbilityModifier = function(abilityName)  {
        return this.translateModifier(characterService.getAbilityModifier(abilityName));
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
    
    this.getSkillModifier = function(skillName) {
        return this.translateModifier(characterService.getSkillModifier(skillName));
    };

    this.getInitiative = function()  {
        return this.translateModifier(characterService.getInitiative());
    };

    this.getWeaponAttackBonus = function() {
        return this.translateModifier(weaponService.getAttackBonus());
    };

    this.getAbilityScore = function(abilityName)  {
        return characterService.getAbilityScore(abilityName);
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

    this.isClassSkill = function(skillName) {
        return characterService.isClassSkill(skillName);
    };

    this.getWeaponDamageString = function(weapon) {
        return weaponService.getDamageString(weapon);
    };

    this.getSpeed = function() {
        return characterService.getSpeed();
    }
}