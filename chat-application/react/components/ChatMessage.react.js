var React = require('react');

var ChatMessage = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        nick: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        datetime: React.PropTypes.string.isRequired,
        onDelete: React.PropTypes.func.isRequired
    },

    onDeleteClick: function() {
        this.props.onDelete(this.props.id);
    },

    render: function () {
        var colorClassName = "";
        var deleteButton = "";

        if (this.props.type == "join") {
            colorClassName = "text-success";
        } else if (this.props.type == "left") {
            colorClassName = "text-danger";
        }

        if (this.props.type == 'say') {
            deleteButton = <div className="msg-delete" titleName="Delete message" onClick={this.onDeleteClick}>x</div>
        }
        return (
            <div className="chat-message">
                {deleteButton}
                <div className="msg-datetime">[{this.props.datetime}]</div>
                <div className="msg-nick">{this.props.nick}</div>
                <div className="msg-separator"></div>
                <div className={"msg-text "+colorClassName}>{this.props.text}</div>
            </div>
            );
    }

});

module.exports = ChatMessage;