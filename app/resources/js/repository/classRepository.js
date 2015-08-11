function ClassRepository() {
    BaseRepository.call(this);

    this.repository = [
        classBarbarian, classBard, classCleric, classDruid, classFighter, classMonk,
        classPaladin, classRanger, classRogue, classSorcerer, classWizard
    ];
}

ClassRepository.prototype = Object.create(BaseRepository.prototype);
ClassRepository.prototype.constructor = ClassRepository;

var classRepository = new ClassRepository();