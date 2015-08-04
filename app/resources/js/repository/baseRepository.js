function BaseRepository() {
    this.repository = [];
}

BaseRepository.prototype.find = function(id) {
    return _.find(this.repository, 'id', id);
};

BaseRepository.prototype.load = function(id, detail) {
    var retVal = this.find(id);
    if (retVal && retVal.hasOwnProperty('detail') && detail !== undefined && detail !== null) {
        retVal.detail = detail;
    }

    return retVal;
};