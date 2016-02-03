var constants = require("./constants");

module.exports = {
    setChangeWatched: function (movieId) {
        return function (dispatch, getState) {
            dispatch({type: constants.MOVIE_CHANGE_WATCHED, movieId: movieId});
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
    },

    backState: function (movieId) {
        return function (dispatch, getState) {
            dispatch({type: constants.STATE_BACK});
        };
    },

    nextState: function (movieId) {
        return function (dispatch, getState) {
            dispatch({type: constants.STATE_NEXT});
        };
    }
};