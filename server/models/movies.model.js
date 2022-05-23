const mongoose = require("mongoose");

const MoviesSchema = {
    movieName: {
        type: String,
        required: [true, "Movie Name is required"],
        minLength: [3, "Movie Name must be at least 3 characters"],
    },

    rating: {
        type: String,
        required: [true, "Please Please Select a rating from 1 to 5"],
    },
        

    comment: {
        type: String,
        required: [true, "name is required"],
        minLength: [2, "Name must be at least 3 characters"],
    },

    userName: {
        type: String,
    }

};

module.exports = mongoose.model("Movie", MoviesSchema);