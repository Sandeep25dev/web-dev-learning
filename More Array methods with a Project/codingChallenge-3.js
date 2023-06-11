'use strict';
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time 
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

*/

const calcAverageHumanAge = function (ages) {
    const avgHumanAge = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(humanAge => humanAge > 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0)
    
    return avgHumanAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));