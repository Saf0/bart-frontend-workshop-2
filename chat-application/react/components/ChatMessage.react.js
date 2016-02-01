var React = require('react');

var ChatMessage = React.createClass({
    propTypes: {
        nick: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        datetime: React.PropTypes.string.isRequired
    },

    render: function () {
        var colorClassName = "";

        if (this.props.type == "join") {
            colorClassName = "text-success";
        } else if (this.props.type == "left") {
            colorClassName = "text-danger";
        }

        return (
            <div className="chat-message">
                <div className="msg-datetime">[{this.props.datetime}]</div>
                <div className="msg-nick">{this.props.nick}</div>
                <div className="msg-separator"></div>
                <div className={"msg-text "+colorClassName}>{this.props.text}</div>
            </div>
            );
    }

});

module.exports = ChatMessage;