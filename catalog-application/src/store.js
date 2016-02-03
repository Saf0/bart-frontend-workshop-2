var Redux = require("redux"),
    catalogReducer = require("./reducers/catalogReducer"),
    initialState = require("./initialState"),
    thunk = require('redux-thunk');

var rootReducer = Redux.combineReducers({
    catalog: catalogReducer
});

if (window.devToolsExtension) {
    module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState(),window.devToolsExtension());
} else {
    module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState());
}