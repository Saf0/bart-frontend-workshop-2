var a = {data: 1};

var b = a;

b.data = 1;

console.log(b === a); //TRUE

b.data = 3;

console.log(b === a);//TRUE