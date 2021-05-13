const badRequestError = require('../errors/badRequestError');
const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    getAll() {
        const items = FighterRepository.getAll();
        if (!items) {
            return null;
        }
        return items;
    }
    getOneById(id) {
        const item = FighterRepository.getOne({ id });
        if (!item) {
            return null;
        }
        return item;
    }
    addFighter(data) {
        const checkFighterName = FighterRepository.getOne({name: data.name});
        if(checkFighterName){
            throw new badRequestError('Fighter name already exists');
        }
        return FighterRepository.create(data);

    }
    deleteFighter(id) {
        const fighter = FighterRepository.delete(id);
        if (!fighter) {
            return null;
        }
        return fighter;
    }
    updateFighter(id, dataToUpdate) {
        console.log("data t oUpdate:",dataToUpdate);
        const fighter = FighterRepository.getOne({id});
        const checkFighterName = FighterRepository.getOne({name: dataToUpdate.name});

        if(!fighter){
            throw Error('Fighter is not found');
        }
        if(checkFighterName){
            throw Error('Fighter name already exists')
        }
        return FighterRepository.update(id, dataToUpdate);
    }
}

module.exports = new FighterService();