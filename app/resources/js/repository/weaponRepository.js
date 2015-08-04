function WeaponRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Weapon(1, 'Greatclub', null, 8, '19-20x2', null, '1d10', 'Bludgeoning', ['twoHanded'], null),
        new Weapon(2, 'Dagger', null, 1, '19-20x2', 10, '1d4', 'Piercing', ['light'], null),
        new Weapon(3, 'Sickle', null, 2, 'x2', null, '1d6', 'Slashing', ['light'], null)
    ];
}

WeaponRepository.prototype = Object.create(BaseRepository.prototype);
WeaponRepository.prototype.constructor = WeaponRepository;

var weaponRepository = new WeaponRepository();