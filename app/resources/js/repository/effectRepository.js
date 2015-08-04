function EffectRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Effect(1, 'Strength Boost', {strength: 2}, null),
        new Effect(2, 'Bardic Inspiration', {weaponAttack: 1, fortSave: 1, reflexSave: 1, willSave: 1, combatManeuverBonus: 1}, null),
        new Effect(3, 'Crazy Boost', {acrobatics: 5, constitution: 2})
    ];
}

EffectRepository.prototype = Object.create(BaseRepository.prototype);
EffectRepository.prototype.constructor = EffectRepository;

var effectRepository = new EffectRepository();