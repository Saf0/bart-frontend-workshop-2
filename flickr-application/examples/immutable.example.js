var Immutable = require('immutable');

var map1 = Immutable.Map({a:1, b:2, c:3});

var map2 = map1.set('b', 2);

console.log(map1 === map2); // TRUE

var map3 = map1.set('b', 50);

console.log(map1 === map3); // FALSE