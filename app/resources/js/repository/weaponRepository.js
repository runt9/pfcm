function WeaponRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Weapon(1, 'Greatclub', null, 8, '19-20x2', 5, '1d10', 'Bludgeoning', ['twoHanded'], null)
    ];
}

WeaponRepository.prototype = Object.create(BaseRepository.prototype);
WeaponRepository.prototype.constructor = WeaponRepository;

var weaponRepository = new WeaponRepository();