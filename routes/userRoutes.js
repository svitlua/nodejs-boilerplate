const { Router } = require('express');
const UserService = require('../services/userService');
const { updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/', updateUserValid, (req, res, next) => {   
    try {       
        const data = UserService.addUser(req.body)
        res.data = data;        
    }    
    catch (err) {       
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/', (req, res, next) => {
    try {
        const data = UserService.getAll()
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id

        const data = UserService.getOne(id)
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        const id = req.params.id
        const data = UserService.updateUser(id, req.body)

        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        const data = UserService.deleteUser(id)
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;