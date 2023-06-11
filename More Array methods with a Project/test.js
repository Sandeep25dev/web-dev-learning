'use strict';

const a = [1, 2, [3, 4], 6, [7, [8, 9, [10]]]];
// console.log(a);
const b = a.flat(4);
console.log(b);