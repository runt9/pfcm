pfcmServices.factory('characterService', function() {
    return {
        character: {},
        setCharacter: function(character) {
            if (!character instanceof Character) {
                console.error('Not setting local character.');
                return;
            }

            this.character = this.unpackCharacter(character);
            this.recalculateCalculatedEffects();
        },

        unpackCharacter: function(character) {
            character.weapons = _.map(character.weapons, function(id) {
                return weaponRepository.find(id);
            });

            character.feats = _.map(character.feats, function(id) {
                return featRepository.find(id);
            });

            character.effects = _.map(character.effects, function(id) {
                return effectRepository.find(id);
            });

            character.equipment = _.map(character.equipment, function(itemInfo) {
                var repository;
                switch (itemInfo.type) {
                    case ItemType.ARMOR:
                        repository = armorRepository;
                        break;
                    case ItemType.WEAPON:
                        repository = weaponRepository;
                        break;
                    case ItemType.ITEM:
                    default:
                        repository = itemRepository;
                        break;
                }

                return {
                    qty: itemInfo.qty,
                    type: itemInfo.type,
                    item: repository.find(itemInfo.item)
                };
            });

            character.classes = _.map(character.classes, function(classInfo) {
                classInfo['classRef'] = classRepository.find(classInfo.id);
                return classInfo;
            });

            return character;
        },

        getAttributeScore: function(attribute) {
            var attributeName = attribute.name;
            var charAttribute = _.get(this.character.attributes, attributeName);
            if (charAttribute === undefined) {
                console.error('Attempted to get modifier for invalid attribute: %s', attributeName);
                return 0;
            }
    
            return charAttribute.score + charAttribute.temp + this.getCalculatedEffect(attributeName);
        },
    
        getAttributeModifier: function(attribute) {
            return Math.floor(((this.getAttributeScore(attribute)) - 10) / 2);
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
    
        getBaseAttackBonus: function() {
            var classBab = 0;
            _.forEach(this.character.classes, function(classObj) {
                classBab += classObj.classRef.getBaseAttackBonus(classObj.level);
            });

            return classBab + this.getCalculatedEffect('baseAttackBonus');
        },
    
        getInitiative: function() {
            return this.getAttributeModifier(Attribute.DEXTERITY) + this.getCalculatedEffect('initiative');
        },
    
        getCombatManeuverBonus: function() {
            return this.getBaseAttackBonus() + this.getAttributeModifier(Attribute.STRENGTH) +
                this.getCalculatedEffect('combatManeuverBonus');
        },
    
        getCombatManeuverDefense: function() {
            return 10 + this.getBaseAttackBonus() + this.getAttributeModifier(Attribute.STRENGTH)
                + this.getAttributeModifier(Attribute.DEXTERITY) + this.getCalculatedEffect('combatManeuverDefense');
        },
    
        getNormalArmorClass: function() {
            return 10 + this.getAttributeModifier(Attribute.DEXTERITY) + this.getCalculatedEffect('normalArmorClass');
        },
    
        getTouchArmorClass: function() {
            return 10 + this.getAttributeModifier(Attribute.DEXTERITY) + this.getCalculatedEffect('touchArmorClass');
        },
    
        getFlatFootedArmorClass: function() {
            return 10 + this.getCalculatedEffect('flatFootedArmorClass');
        },
    
        getFortSave: function() {
            var classSave = 0;
            _.forEach(this.character.classes, function(classObj) {
                classSave += classObj.classRef.getSave(Class.SaveType.FORT_SAVE, classObj.level);
            });

            return classSave + this.getAttributeModifier(Attribute.CONSTITUTION) + this.getCalculatedEffect('fortSave');
        },
    
        getReflexSave: function() {
            var classSave = 0;
            _.forEach(this.character.classes, function(classObj) {
                classSave += classObj.classRef.getSave(Class.SaveType.REFLEX_SAVE, classObj.level);
            });

            return classSave + this.getAttributeModifier(Attribute.DEXTERITY) + this.getCalculatedEffect('reflexSave');
        },
    
        getWillSave: function() {
            var classSave = 0;
            _.forEach(this.character.classes, function(classObj) {
                classSave += classObj.classRef.getSave(Class.SaveType.WILL_SAVE, classObj.level);
            });

            return classSave + this.getAttributeModifier(Attribute.WISDOM) + this.getCalculatedEffect('willSave');
        },
    
        isClassSkill: function(skill) {
            var retVal = false;
            // Everybody gets craft and profession as class skills
            if (skill == Skill.CRAFT || skill == Skill.PROFESSION) {
                return true;
            }

            _.forEach(this.character.classes, function(classObj) {
                if (_.contains(classObj.classRef.classSkills, skill)) {
                    retVal = true;
                }
            });

            return retVal;
        },

        getSpeed: function() {
            // TODO: Calculate from race & class
            return 40 + this.getCalculatedEffect('speed');
        },
    
        getSkillAttributeModifier: function(skill) {
            return this.getAttributeModifier(skill.governingAttribute);
        },
    
        getSkillModifier: function(skill) {
            var skillName = skill.shortName;
            var skillRanks = _.get(this.character.skills, skillName);
            if (skillRanks === undefined) {
                console.error('Attempted to get modifier for invalid skill: %s', skillName);
                return 0;
            }
    
            var requiresTraining = skill.requiresTraining;
            var classSkill = this.isClassSkill(skill);
            var skillAbilityModifier = this.getSkillAttributeModifier(skill);
            var bonusEffects = this.getCalculatedEffect(skillName);
    
            if (skillRanks == 0) {
                return requiresTraining ? '-' : 0 + skillAbilityModifier + bonusEffects;
            } else {
                var finalModifier = (classSkill ? 3 + skillRanks : skillRanks) + skillAbilityModifier;
                return finalModifier + bonusEffects;
            }
        },

        getCharacterAbilities: function() {
            // TODO: Calculate from class/race/etc
            return [
                new Ability(1, 'Low-Light Vision', null, null),
                new Ability(1, 'Rage', null, '4 Rounds')
            ];
        },

        getSpells: function() {
            // TODO: solidify the format and pull from class info and whatnot
            return {
                0: {
                    slots: 3,
                    spells: [
                        new Spell(1, 'Light', false, null, '40 Minutes'),
                        new Spell(2, 'Spark', true, null, null),
                        new Spell(3, 'Create Water', false, null, null)
                    ]
                },

                1: {
                    slots: 5,
                    spells: [
                        new Spell(4, 'Hunter\'s Howl', false, null, '4 Rounds'),
                        new Spell(5, 'Shillelagh', false, null, '4 Minutes'),
                        new Spell(6, 'Cure Light Wounds', true, null, '1d6 + 4')
                    ]
                },

                2: {
                    slots: 4,
                    spells: [
                        new Spell(7, 'Bloodhound', false, null, '4 Rounds')
                    ]
                }
            };
        },

        getCalculatedEffect: function(key) {
            if (!_.has(this.character.calculatedEffects, key)) {
                return 0;
            }

            var obj = this.character.calculatedEffects[key];
            if (_.isEmpty(obj)) {
                return 0;
            }

            return _.reduce(obj, function(total, n) {
                return total + n;
            });
        },

        recalculateCalculatedEffects: function() {
            var self = this;
            var affectingArrays = [
                this.getCharacterAbilities(),
                this.character.effects,
                this.character.feats,
                this.character.weapons,

                _.map(this.character.equipment, function(itemInfo) {
                    return itemInfo.item;
                })
            ];

            this.character.calculatedEffects = {};
            _.forEach(affectingArrays, function(arr) {
                _.forEach(arr, function(obj) {
                    _.forIn(obj.statEffects, function(value, key) {
                        if (!_.has(self.character.calculatedEffects, key)) {
                            self.character.calculatedEffects[key] = {};
                        }

                        self.character.calculatedEffects[key][obj.name] = value;
                    });
                });
            });
        }
    };
});