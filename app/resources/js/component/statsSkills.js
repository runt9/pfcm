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

    this.getAbilityScore = characterService.getAbilityScore;
    this.getTotalLevel = characterService.getTotalLevel;
    this.getInitiative = characterService.getInitiative;
    this.getCombatManeuverDefense = characterService.getCombatManeuverDefense;
    this.getNormalArmorClass = characterService.getNormalArmorClass;
    this.getTouchArmorClass = characterService.getTouchArmorClass;
    this.getFlatFootedArmorClass = characterService.getFlatFootedArmorClass;
    this.isClassSkill = characterService.isClassSkill;
    this.getWeaponDamageString = weaponService.getDamageString;

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

    this.getWeaponAttackBonus = function() {
        return this.translateModifier(weaponService.getAttackBonus());
    };
}