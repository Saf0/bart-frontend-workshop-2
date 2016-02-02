var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    MovieApp = require('./components/movie-app');

ReactDOM.render(
    <Provider store={store}>
        <MovieApp />
    </Provider>,
    document.getElementById("root")
);