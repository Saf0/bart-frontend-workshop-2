var React = require('react');

var NewMessagePanel = React.createClass({
    componentDidMount: function() {
        this.refs.message.getDOMNode().focus();
    },

    onButtonSendClick: function (event) {
        this.sendMessage();
    },

    onEnterPress: function (event) {
        if (event.keyCode == 13) {
            this.sendMessage();
        }
    },

    sendMessage: function () {
        var messageText = this.refs.message.getDOMNode().value;
        var nick = this.refs.nick.getDOMNode().value;

        if (messageText && nick) {
            this.props.sendMessage(nick, messageText);
            this.refs.message.getDOMNode().value = "";
        }
    },

    onButtonLogoutClick: function() {
        this.props.logout();
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-lg-2">
                    <div className="form-group">
                        <input type="text" ref="nick" value={this.props.nick} disabled="disabled" placeholder="Prezývka" className="form-control" />
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="input-group">
                        <input type="text" ref="message" onKeyDown={this.onEnterPress} placeholder="Text správy..." className="form-control" />
                        <span className="input-group-btn">
                            <button onClick={this.onButtonSendClick} type="button" className="btn btn-primary">Odoslať</button>
                            <button onClick={this.onButtonLogoutClick} type="button" className="btn btn-danger">Odhlásiť sa</button>
                        </span>
                    </div>
                </div>
            </div>
            );
    }

});

module.exports = NewMessagePanel;