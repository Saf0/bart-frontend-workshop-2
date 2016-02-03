var React = require("react"),
    ptypes = React.PropTypes,
    ReactRedux = require("react-redux"),
    actions = require("../actions"),
    Movie = require("./movie");

var AddMovieForm = React.createClass({
    propTypes: {
        addMovie: ptypes.func.isRequired
    },

    onClickAddMovie: function () {
        var name = this.refs.nameInput.value;
        var year = this.refs.yearSelect.value;
        var watched = this.refs.watchedCheckbox.checked;

        if (!name) {
            alert("Vyplnte názov filmu");
            return;
        }

        var movie = {
            id: Math.floor(Math.random() * 1000000),
            name: name,
            year: year,
            watched: watched
        };

        this.refs.nameInput.value = "";
        this.refs.yearSelect.value = "2016";
        this.refs.watchedCheckbox.checked = false;
        this.props.addMovie(movie);
    },

    onClickBack: function() {
        this.props.backState();
    },

    onClickNext: function() {
        this.props.nextState();
    },

    render: function () {
        var yearsHtml = [];

        for(var year = 2016; year > 1950; year--) {
            yearsHtml.push(<option key={year} value={year}>{year}</option>);
        }

        return (
            <div>
                <div className="text-right form-group">
                    <button className="btn btn-primary" style={{marginRight: "10px"}} onClick={this.onClickBack}>späť</button>
                    <button className="btn btn-primary" onClick={this.onClickNext}>ďalej</button>
                </div>
                <div data-example-id="simple-horizontal-form" className="bs-example">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="inputEmail3">Názov filmu</label>
                            <div className="col-sm-10">
                                <input ref="nameInput" type="text" id="movie-name" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="inputPassword3">Rok vydania</label>
                            <div className="col-sm-10">
                                <select ref="yearSelect" className="form-control">
                                    {yearsHtml}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" ref="watchedCheckbox" />Už som ho videl</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button onClick={this.onClickAddMovie} type="button" className="btn btn-primary">Pridať film</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {catalog: state.catalog};
};

var mapDispatchToProps = function (dispatch) {
    return {
        addMovie: function (movie) {
            dispatch(actions.addMovie(movie));
        },
        backState: function () {
            dispatch(actions.backState());
        },
        nextState: function () {
            dispatch(actions.nextState());
        }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AddMovieForm);