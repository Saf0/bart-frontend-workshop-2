var React = require('react');
var moment = require('moment');
var Firebase = require("firebase");
var ChatMessage = require('./ChatMessage.react');
var NewMessagePanel = require('./NewMessagePanel.react');
var LoginPanel = require('./LoginPanel.react');

var ChatApp = React.createClass({
    getInitialState: function () {
        return {
            messages: [],
            myDataRef: null
        };
    },

    componentDidMount: function () {
        var myDataRef = new Firebase('https://blistering-fire-8731.firebaseio.com/chat-application/messages');
        if (myDataRef) {
            myDataRef.orderByChild("timestamp").on('child_added', this.handleMessage);
            myDataRef.on('child_removed', this.handleDeleteMessage);
        }
        this.setState({myDataRef: myDataRef});

        var _this = this;

        window.addEventListener('unload', function(event) {
            _this.logout();
        });
    },

    handleDeleteMessage: function(message){
        var messages = this.state.messages;
        delete messages[message.key()];
        this.setState({ messages: messages });
    },

    handleMessage: function (snapshot) {
        var newMessage = snapshot.val();
        id = snapshot.key();
        var messages = this.state.messages;
        messages[id] = newMessage;
        this.setState({messages: messages});
    },

    sendMessage: function (nick, messageText) {
        var now = moment();

        var newMessage = {
            nick: nick,
            type: "say",
            timestamp: now.format("X"),
            text: messageText
        };

        this.state.myDataRef.push(newMessage);
    },

    deletedMessage: function (messageId) {
        this.state.myDataRef.child(messageId).remove()
    },

    deleteMessage: function (id) {
        this.state.myDataRef.child(id).remove();
    },

    login: function(nick) {
        this.setState({nick: nick});
        var now = moment();

        var newMessage = {
            nick: "*",
            type: "join",
            timestamp: now.format("X"),
            text: nick+" sa prihlásil"
        };

        this.state.myDataRef.push(newMessage);
    },

    logout: function() {
        if (this.state.nick) {
            var now = moment();

            var newMessage = {
                nick: "*",
                type: "left",
                timestamp: now.format("X"),
                text: this.state.nick+" odišiel"
            };

            this.state.myDataRef.push(newMessage);
            this.setState({nick: null});
        }
    },

    render: function () {

        var messages = this.state.messages;
        var messagesHtml = [];
        for (var id in messages) {
            var message = messages[id];
            var datetime = moment.unix(message.timestamp).format("HH:mm:ss");
            messagesHtml.push(
                <ChatMessage
                    key={id}
                    id={id}
                    nick={message.nick}
                    text={message.text}
                    type={message.type}
                    datetime={datetime}
                    deleteMessage={this.deleteMessage}
                    canDelete={message.nick === this.state.nick}/>);
        }

        var panel = null;
        if (this.state.nick) {
            panel = <NewMessagePanel nick={this.state.nick} sendMessage={this.sendMessage} logout={this.logout} />;
        } else {
            panel = <LoginPanel login={this.login} />
        }

        return (
            <div>
                {panel}
                <div className="panel panel-info">
                    <div className="panel-heading">Zoznam správ</div>
                    <div className="panel-body">
                        {messagesHtml}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = ChatApp;