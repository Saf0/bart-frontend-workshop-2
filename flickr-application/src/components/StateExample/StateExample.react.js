var React = require('react');

var StateExample = React.createClass({

    getInitialState: function() {
        return {show: false};
    },

    handleClick: function(event) {
        this.setState({show: !this.state.show});
    },

    render: function() {
        var text = this.state.show ? "Frontend" : "masters";
        return (
            <div className="special-container">
                <h1>{text}</h1>
                <p><a onClick={this.handleClick} className="btn btn-primary btn-lg" href="#" role="button">Change</a></p>
            </div>
        );
    }

});

module.exports = StateExample;