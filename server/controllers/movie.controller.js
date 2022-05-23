const Movie = require("../models/movies.model");

const createNewMovie = (req, res) => {
    Movie.create(req.body)
        .then((newMovie) => {
        res.json({ newMovie});
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

const oneMovie = (req, res) => {
    Movie.findOne({ _id: req.params.id })
        .then((queriedMovie) => {
            res.json({queriedMovie});
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const allMoviesList = (req, res) => {
    Movie.find()
        .then((allMovies) => {
        res.json(allMovies);
    })
        .catch((err) => {
        res.status(400).json({ err });
    });
};


const updateMovie = (req, res) => {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
        })
        .then((updateMovie) => {
            res.json({ updateMovie });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const deleteExistingMovie = (req, res) => {
    Movie.deleteOne({ _id: req.params.id })
        .then((deletedResponse) => {
            res.json({ deletedResponse });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const findRatingsByUser = (req, res) =>{
    Movie.find({userName:req.params.userName})
            .then((ratings) => {
                res.json(ratings)
            })
            .catch((err) => {
                res.json(err)
            })
}

module.exports = {createNewMovie, oneMovie, allMoviesList, updateMovie, deleteExistingMovie, findRatingsByUser};