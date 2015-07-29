pfcmServices.factory('characterService', function() {
    return {
        character: {},
        setCharacter: function(character) {
            if (!character instanceof Character) {
                console.error('Not setting local character.');
                return;
            }

            this.character = character;
        },

        getAbilityScore: function(abilityName) {
            var ability = _.get(this.character.abilities, abilityName);
            if (ability === undefined) {
                console.error('Attempted to get modifier for invalid ability: %s', abilityName);
                return 0;
            }
    
            return ability.score + ability.temp;
        },
    
        getAbilityModifier: function(abilityName) {
            return Math.floor(((this.getAbilityScore(abilityName)) - 10) / 2);
        },
    
        getTotalLevel: function() {
            if (this.character.classes.length == 0) {
                console.error('Character has no classes.');
                return 0;
            }
    
            return _.reduce(this.character.classes, function(total, classObj) {
                return total + classObj['level'];
            }, 0);
        },
    
        // TODO: Get actual bonus from class
        getBaseAttackBonus: function() {
            return 4;
        },
    
        getInitiative: function() {
            return this.getAbilityModifier('dexterity');
        },
    
        getCombatManeuverBonus: function() {
            return this.getBaseAttackBonus() + this.getAbilityModifier('strength');
        },
    
        getCombatManeuverDefense: function() {
            return 10 + this.getBaseAttackBonus() + this.getAbilityModifier('strength')
                + this.getAbilityModifier('dexterity')
        },
    
        getNormalArmorClass: function() {
            return 10 + this.getAbilityModifier('dexterity');
        },
    
        getTouchArmorClass: function() {
            return 10 + this.getAbilityModifier('dexterity');
        },
    
        getFlatFootedArmorClass: function() {
            return 10;
        },
    
        getFortSave: function() {
            return this.getAbilityModifier('constitution');
        },
    
        getReflexSave: function() {
            return this.getAbilityModifier('dexterity');
        },
    
        getWillSave: function() {
            return this.getAbilityModifier('wisdom');
        },
    
        isClassSkill: function(skillName) {
            return (skillName.length > 4);
        },

        getSpeed: function() {
            // TODO: Calculate from race & class
            return 40;
        },
    
        getSkillAbilityModifier: function(skillName) {
            var skillAbilities = {
                strength: ['climb', 'swim'],
                dexterity: ['acrobatics', 'disableDevice', 'escapeArtist', 'fly', 'ride', 'sleightOfHand', 'stealth'],
                intelligence: ['appraise', 'craft', 'knArcana', 'knDungeoneering', 'knEngineering', 'knGeography', 'knHistory',
                    'knLocal', 'knNature', 'knNobility', 'knPlanes', 'knReligion', 'linguistics', 'spellcraft'],
                wisdom: ['heal', 'perception', 'profession', 'senseMotive', 'survival'],
                charisma: ['bluff', 'diplomacy', 'disguise', 'handleAnimal', 'intimidate', 'perform', 'useMagicDevice']
            };
    
            var ability = _.findKey(skillAbilities, function(obj) {
                return _.indexOf(obj, skillName) > -1;
            });
    
            return this.getAbilityModifier(ability);
        },
    
        getSkillModifier: function(skillName) {
            var skillRanks = _.get(this.character.skills, skillName);
            if (skillRanks === undefined) {
                console.error('Attempted to get modifier for invalid skill: %s', skillName);
                return 0;
            }
    
            var skillsThatRequireTraining = ['disableDevice', 'handleAnimal', 'knArcana', 'knDungeoneering', 'knEngineering',
                'knGeography', 'knHistory', 'knLocal', 'knNature', 'knNobility', 'knPlanes', 'knReligion', 'linguistics',
                'profession', 'sleightOfHand', 'Spellcraft', 'useMagicDevice'];
    
            var requiresTraining = _.indexOf(skillsThatRequireTraining, skillName) > -1;
            var classSkill = this.isClassSkill(skillName);
            var skillAbilityModifier = this.getSkillAbilityModifier(skillName);
    
            if (skillRanks == 0) {
                return requiresTraining ? '-' : 0 + skillAbilityModifier;
            } else {
                return (classSkill ? 3 + skillRanks : skillRanks) + skillAbilityModifier;
            }
        },

        getCharacterAbilities: function() {
            // TODO: Calculate from class/race/etc
            return [
                new Ability(1, 'Low-Light Vision', null, null),
                new Ability(1, 'Rage', null, '4 Rounds')
            ];
        }
    };
});