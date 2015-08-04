function ItemRepository() {
    BaseRepository.call(this);

    this.repository = [
        new Item(1, 'Rope (50ft)', null, 1),
        new Item(2, 'Gold', null, 1)
    ];
}

ItemRepository.prototype = Object.create(BaseRepository.prototype);
ItemRepository.prototype.constructor = ItemRepository;

var itemRepository = new ItemRepository();