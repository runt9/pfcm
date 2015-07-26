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

    this.getAbilityScore = function(abilityName)  {
        return characterService.getAbilityScore(abilityName);
    };

    this.getAbilityModifier = function(abilityName)  {
        return characterService.getAbilityModifier(abilityName);
    };

    this.getTotalLevel = function()  {
        return characterService.getTotalLevel();
    };

    this.getBaseAttackBonus = function()  {
        return characterService.getBaseAttackBonus();
    };

    this.getInitiative = function()  {
        return characterService.getInitiative();
    };

    this.getCombatManeuverBonus = function()  {
        return characterService.getCombatManeuverBonus();
    };

    this.getCombatManeuverDefense = function()  {
        return characterService.getCombatManeuverDefense();
    };

    this.getNormalArmorClass = function()  {
        return characterService.getNormalArmorClass();
    };

    this.getTouchArmorClass = function()  {
        return characterService.getTouchArmorClass();
    };

    this.getFlatFootedArmorClass = function() {
        return characterService.getFlatFootedArmorClass();
    };

    this.getFortSave = function()  {
        return characterService.getFortSave();
    };

    this.getReflexSave = function()  {
        return characterService.getReflexSave();
    };

    this.getWillSave = function()  {
        return characterService.getWillSave();
    };

    this.isClassSkill = function(skillName)  {
        return characterService.isClassSkill(skillName);
    };
    
    this.getSkillModifier = function(skillName) {
        return characterService.getSkillModifier(skillName);
    };

    this.getWeaponAttackBonus = function() {
        return weaponService.getAttackBonus();
    };

    this.getWeaponDamageString = function(weapon) {
        return weaponService.getDamageString(weapon);
    };

    this.camelCase = function(str) {
        return _.camelCase(str);
    }
}