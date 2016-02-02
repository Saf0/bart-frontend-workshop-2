var Redux = require("redux"),
    catalogReducer = require("./reducers/catalogReducer"),
    initialState = require("./initialstate"),
    thunk = require('redux-thunk');

var rootReducer = Redux.combineReducers({
    catalog: catalogReducer
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState());