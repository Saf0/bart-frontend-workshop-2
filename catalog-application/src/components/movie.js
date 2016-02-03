var React = require("react");

var Movie = React.createClass({
    propTypes: {
        movie: React.PropTypes.object
    },

    onClickDeleteMovie: function(event) {
        this.props.deleteMovie(this.props.movie.id);
    },

    onChangeWatched: function(event) {
        this.props.setChangeWatched(this.props.movie.id);
    },

    render: function(){
        return (
            <tr>
                <td>
                    {this.props.movie.name}
                </td>
                <td>
                    {this.props.movie.year}
                </td>
                <td>
                    <input type="checkbox" onChange={this.onChangeWatched} checked={this.props.movie.watched ? 'checked' : null} />
                </td>
                <td className="text-right">
                    <button onClick={this.onClickDeleteMovie} type="button" className="btn btn-primary btn-xs">Zmazať</button>
                </td>
            </tr>
        );
    }
});

module.exports = Movie;