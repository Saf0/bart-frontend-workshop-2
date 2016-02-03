var React = require('react');

var Example = React.createClass({

    getInitialState: function () {
        return {
            data: null
        }
    },

    componentDidMount: function(){
    },

    render: function () {
        return(
            <div >
                Hello world
             </ div >
        )
    }
});

module.exports = Example;