function FeatRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Feat(1, 'Skill Focus', null, 'Perception', {perception: 3}),
        new Feat(2, 'Improved Initiative', null, null, {initiative: 4})
    ];
}

FeatRepository.prototype = Object.create(BaseRepository.prototype);
FeatRepository.prototype.constructor = FeatRepository;

var featRepository = new FeatRepository();