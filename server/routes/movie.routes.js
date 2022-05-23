const movieController = require("../controllers/movie.controller");

module.exports = (app) => {
    
    app.post("/api/movie", movieController.createNewMovie);
    app.get("/api/movie/:id", movieController.oneMovie);
    app.get("/api/movie", movieController.allMoviesList);
    app.put("/api/movie/:id", movieController.updateMovie);
    app.delete("/api/movie/:id", movieController.deleteExistingMovie);
    app.get("/api/ratings/:userName", movieController.findRatingsByUser);
};