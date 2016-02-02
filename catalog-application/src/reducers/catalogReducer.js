var constants = require("../constants"),
    initialState = require("../initialstate");

module.exports = function(state, action){
    var newstate = Object.assign({},state);
    switch(action.type){
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
            return newstate;
        case constants.MOVIE_ADD:
            newstate.movies.push(action.movie);
            return newstate;
        case constants.MOVIE_SET_AS_WATCHED:
            var movieId = action.movieId;

            var movies = newstate.movies;
            for(var i = 0; i < movies.length; i++) {
                if (movies[i].id == movieId) {
                    movies[i].watched = !movies[i].watched;
                    break;
                }
            }

            newstate.movies = movies;
            return newstate;
        default: return state || initialState().catalog;
    }
};