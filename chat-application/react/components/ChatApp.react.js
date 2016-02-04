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
            myDataRef.on('child_added', this.handleMessage);
            myDataRef.on('child_removed', this.handleDeletedMessage);
        }
        this.setState({myDataRef: myDataRef});

        var _this = this;

        window.addEventListener('unload', function(event) {
            _this.logout();
        });
    },

    handleMessage: function (snapshot) {
        var newMessage = snapshot.val();
        newMessage.$id = snapshot.key();
        var messages = this.state.messages;
        messages.unshift(newMessage);
        this.setState({messages: messages});
    },

    handleDeletedMessage: function(snapshot) {
        var messages = this.state.messages;
        var id = snapshot.key();
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].$id == id) {
                messages.splice(i, 1);
                break;
            }
        }

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

    deleteMessage: function(messageId) {
        this.state.myDataRef.child(messageId).remove()
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

        var messagesHtml = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            var datetime = moment.unix(message.timestamp).format("HH:mm:ss");
            messagesHtml.push(
                <ChatMessage
                key={i}
                id={message.$id}
                nick={message.nick}
                text={message.text}
                type={message.type}
                datetime={datetime}
                onDelete={this.deleteMessage}/>);
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