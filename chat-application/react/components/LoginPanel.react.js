var React = require('react');

var NewMessagePanel = React.createClass({
    onButtonSendClick: function (event) {
        this.login();
    },

    onEnterPress: function (event) {
        if (event.keyCode == 13) {
            this.login();
        }
    },

    login: function () {
        var nick = this.refs.nick.getDOMNode().value;

        if (nick && nick != "*") {
            this.props.login(nick);
        }
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="input-group">
                        <input type="text" ref="nick" onKeyDown={this.onEnterPress} placeholder="Prezývka" className="form-control" />
                        <span className="input-group-btn">
                            <button onClick={this.onButtonSendClick} type="button" className="btn btn-primary">Pripojiť sa</button>
                        </span>
                    </div>
                </div>
            </div>
            );
    }

});

module.exports = NewMessagePanel;