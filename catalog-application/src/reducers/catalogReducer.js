var constants = require("../constants"),
    initialState = require("../initialState"),
    ce = require('cloneextend');

var stateHistory = [];
var actualStateIndex = -1;

module.exports = function(state, action){
    //var newstate = Object.assign({},state);
    var newstate = ce.clone(state);

    switch(action.type){
        case constants.STATE_BACK:
            if (stateHistory.length > 0 && actualStateIndex > 0) {
                actualStateIndex--;
                newstate = stateHistory[actualStateIndex];
                return newstate;
            } else {
                return newstate;
            }
            break;

        case constants.STATE_NEXT:
            if (actualStateIndex < stateHistory.length - 1) {
                actualStateIndex++;
                newstate = stateHistory[actualStateIndex];
                return newstate;
            } else {
                return newstate;
            }
            break;

        case constants.MOVIE_DELETE:
            var movieId = action.movieId;

            var movies = newstate.movies;
            for(var i = 0; i < movies.length; i++) {
                if (movies[i].id == movieId) {
                    movies.splice(i, 1);
                    break;
                }
            }

            newstate.movies = movies;
            break;
        case constants.MOVIE_ADD:
            newstate.movies.push(action.movie);
            break;
        case constants.MOVIE_CHANGE_WATCHED:
            var movieId = action.movieId;

            var movies = newstate.movies;
            for(var i = 0; i < movies.length; i++) {
                if (movies[i].id == movieId) {
                    movies[i].watched = !movies[i].watched;
                    break;
                }
            }

            newstate.movies = movies;
            break;
        default: newstate = state || initialState().catalog;
    }

    if (actualStateIndex < stateHistory.length - 1) {
        // zmazeme nasledujuce stavy
        stateHistory.splice(actualStateIndex + 1, stateHistory.length - actualStateIndex);
    }
    if (newstate) {
        stateHistory.push(newstate);
        actualStateIndex++;
    }
    return newstate;
};