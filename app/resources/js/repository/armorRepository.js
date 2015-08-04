function ArmorRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Armor(1, 'Breastplate', null, 15, 6, -4)
    ];
}

ArmorRepository.prototype = Object.create(BaseRepository.prototype);
ArmorRepository.prototype.constructor = ArmorRepository;

var armorRepository = new ArmorRepository();