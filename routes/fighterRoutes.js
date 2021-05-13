const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const data = FighterService.getAll();
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
        const data = FighterService.getOneById(id)
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', updateFighterValid, (req, res, next) => {
    try {
        const data = FighterService.addFighter(req.body);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    try {
        const id = req.params.id
        const data = FighterService.updateFighter(id, req.body);
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
        const data = FighterService.deleteFighter(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;