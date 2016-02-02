var React = require("react"),
    MovieList = require('./movie-list'),
    AddMovieForm = require('./add-movie-form');

var MovieApp = React.createClass({
    render: function(){
        return (
            <div>
                <AddMovieForm />
                <MovieList />
            </div>
        );
    }
});

module.exports = MovieApp;