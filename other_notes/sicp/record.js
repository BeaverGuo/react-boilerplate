//js record.
/* 
//1.realize cons
function cons(x, y) {
  return (m) => m === 0 ? x : m === 1 ? y : undefined
}

function car(x) {
  return x(0)
}

function cdr(x) {
  return x(1)
}

let z = cons(2, 3)
console.log(car(z), cdr(z))

//2.realize cons


function cons(x, y) {
  return (m) => m(x, y)
}

function car(z) {
  return z((p, q) => p)
}

function cdr(z) {
  return z((p, q) => q)
}

let z = cons(4, 2)
console.log(car(z), cdr(z))
*/
