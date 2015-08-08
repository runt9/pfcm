function ClassRepository() {
    BaseRepository.call(this);

    this.repository = [
        classFighter
    ];
}

ClassRepository.prototype = Object.create(BaseRepository.prototype);
ClassRepository.prototype.constructor = ClassRepository;

var classRepository = new ClassRepository();