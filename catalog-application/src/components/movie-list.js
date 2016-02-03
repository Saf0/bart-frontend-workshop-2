var React = require("react"),
    ptypes = React.PropTypes,
    ReactRedux = require("react-redux"),
    actions = require("../actions"),
    Movie = require("./movie");

var MovieList = React.createClass({
    propTypes: {
        catalog: ptypes.object.isRequired,

        deleteMovie: ptypes.func.isRequired,
        setChangeWatched: ptypes.func.isRequired
    },

    render: function () {
        var moviesHtml = [];

        for (var i = 0; i < this.props.catalog.movies.length; i++) {
            var movie = this.props.catalog.movies[i];
            moviesHtml.push(<Movie key={movie.id} setChangeWatched={this.props.setChangeWatched} deleteMovie={this.props.deleteMovie} movie={movie} />);
        }

        if (moviesHtml.length == 0) {
            return (
                <div>
                    V katalógu sa nenachádzajú žiadne filmy
                </div>
            );
        }

        return (
            <table className="table table-striped table-bordered ">
                <thead>
                    <tr>
                        <th>Názov</th>
                        <th>Rok vydania</th>
                        <th>Videný</th>
                        <th className="text-right">Zmazať</th>
                    </tr>
                </thead>
                <tbody>
                    {moviesHtml}
                </tbody>
            </table>
        );
    }
});

var mapStateToProps = function (state) {
    return {catalog: state.catalog};
};

var mapDispatchToProps = function (dispatch) {
    return {
        addMovie: function () {
            dispatch(actions.addMovie());
        },
        deleteMovie: function (movieId) {
            dispatch(actions.deleteMovie(movieId));
        },
        setChangeWatched: function (movieId) {
            dispatch(actions.setChangeWatched(movieId));
        }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MovieList);