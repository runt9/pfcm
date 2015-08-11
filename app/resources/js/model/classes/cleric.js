var classCleric = new Class(
    3, 'Cleric', 8, 2,
    [
        Skill.APPRAISE, Skill.DIPLOMACY, Skill.HEAL, Skill.KN_ARCANA, Skill.KN_HISTORY,
        Skill.KN_NOBILITY, Skill.KN_PLANES, Skill.KN_RELIGION, Skill.LINGUISTICS, Skill.SENSE_MOTIVE,
        Skill.SPELLCRAFT
    ],
    Class.BaseAttackBonusStrength.MEDIUM, Class.SaveStrength.STRONG, Class.SaveStrength.WEAK, Class.SaveStrength.STRONG,
    {},
    null
);