var constants = require("./constants");

module.exports = {
    setMovieAsWatched: function (movieId) {
        return function (dispatch, getState) {
            dispatch({type: constants.MOVIE_SET_AS_WATCHED, movieId: movieId});
        };
    },

    addMovie: function (movie) {
        return function (dispatch, getState) {
            dispatch({type: constants.MOVIE_ADD, movie: movie});
        };
    },

    deleteMovie: function (movieId) {
        return function (dispatch, getState) {
            dispatch({type: constants.MOVIE_DELETE, movieId: movieId});
        };
    }
};