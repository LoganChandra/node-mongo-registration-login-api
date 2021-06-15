const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Movie = db.Movie;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return await Movie.findById(id);
}

async function create(movieParam) {
    
    if (await Movie.findOne({ moviename: movieParam.moviename })) {
        throw 'Username "' + movieParam.moviename + '" is already taken';
    }

    const movie = new Movie(movieParam);

    if (movieParam.password) {
        movie.hash = bcrypt.hashSync(movieParam.password, 10);
    }

    await movie.save();
}

async function update(id, movieParam) {
    const movie = await Movie.findById(id);

    if (!movie) throw 'Movie not found';
    if (movie.moviename !== movieParam.moviename && await Movie.findOne({ moviename: movieParam.moviename })) {
        throw 'Username "' + movieParam.moviename + '" is already taken';
    }

    if (movieParam.password) {
        movieParam.hash = bcrypt.hashSync(movieParam.password, 10);
    }

    Object.assign(movie, movieParam);

    await movie.save();
}

async function _delete(id) {
    await Movie.findByIdAndRemove(id);
}