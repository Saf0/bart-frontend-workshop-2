var React = require('react');
var ReactDOM = require('react-dom');
var immutable = require('immutable');


var AppElement = document.getElementById('app-container');

if (AppElement != null) {
    var Photo = require('./components/Photo/Photo.react');
    ReactDOM.render(
        <Photo />,
        AppElement
    );
}