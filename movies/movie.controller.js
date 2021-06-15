const express = require('express');
const router = express.Router();
const movieService = require('./movie.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function register(req, res, next) {
    movieService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    movieService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}


function getById(req, res, next) {
    movieService.getById(req.params.id)
        .then(movie => movie ? res.json(movie) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    movieService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    movieService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}