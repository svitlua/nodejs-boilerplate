const { UserRepository } = require('../repositories/userRepository');
const badRequestError = require('../errors/badRequestError');
const notFoundError = require('../errors/notFoundError');

class UserService {
    search(userData){
        const { email, password } = userData;
        const items = UserRepository.getAll();
        const user = items.find(dbUser=> dbUser.email === email && dbUser.password === password);
        if(!user) return null;
        return user;
    }

    getAll() {
        const items = UserRepository.getAll();
        if (!items) return null;
        return items;
    }

    getOne(id) {
        const item = UserRepository.getOne({ id });
        if (!item) return null; d
        return item;
    }

    addUser(data) {
        const isNotUniqEmail = UserRepository.getOne({ email: data.email });
        const isNotUniqPhoneNumber = UserRepository.getOne({ phoneNumber: data.phoneNumber });

        if (isNotUniqPhoneNumber) {
            throw new badRequestError('Phone number is not unique');
        }
        if (isNotUniqEmail) {
            throw new badRequestError('Email is not unique');
        }
        return UserRepository.create(data)
    }

    updateUser(id, dataToUpdate) {
        const user = UserRepository.getOne({ id });
        const checkEmail = UserRepository.getOne({email: dataToUpdate.email});
        if(!user){
            throw Error('User is not found');
        }
        if(checkEmail){
            throw Error('Email is not unique')
        }
        return UserRepository.update(id, dataToUpdate)
    }
    deleteUser(id) {
        const item = UserRepository.delete(id);
        if (!item) {
            throw Error('User could not be deleted')
        }
        return item;
    }
}

module.exports = new UserService();