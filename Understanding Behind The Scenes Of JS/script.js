'use strict';

/*

function calcAge(birthYear) {
    const now = 2023;
    const age = now - birthYear;
    function printAge() {
        let output = `${firstName}, you are ${age} years old, and you were born in ${birthYear}`;
        console.log(output);
        
        if (birthYear >= 1996 && birthYear <= 2004) {
            //Creating NEW variables with the same name as outer scopes
            const firstName = 'ShaKuSo';
            //Now the output of this statement will be ShaKuSo and Not Sandeep. Means if the required variable can be found in it's own scope then that scope wont do a scope variable lookup, it will simply just use it's own variable

            //Reassigning the VALUE of outer scopes
            output = 'NEW OUTPUT !';
            //It will work because it still has access to it's parent scope
            
            var eligiblilty = true;
            const str = `Congratulations ${firstName}, You are eligible for this task`;
            console.log(str);
            
            function add(a, b) {
                return a + b;
            }
            
            const output = 'NEW OUTPUT !';
            
            //Now it has it's own variable it will no longer return the above 'NEW OUTPUT' Instead it will now return the old output variable which has been declared above
        }
        // console.log(str); 
        //It will throw an error because it calls a variable which stores under a child function scope where the parent function scope don't have the access.
        console.log(eligiblilty);
        //It wil not throw an error because var is not block scoped, it's actually function scoped So you can call it even in it's parent scope
        // add(2, 3);
        //Hence it will also throw an error because functions are also block scoped, But it only happens in strict mode
        console.log(output);
    }
    printAge();
    return age;
}
const firstName = 'Sandeep';
calcAge(2003);

*/


/*


// Hoisting With Variables

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Sandeep';
let job = 'SDE';
const year = 2003;

// Hoisting with Functions

console.log(addDecl(3, 5));
// console.log(addExpr(3, 5));
// console.log(addArrow(3, 5));

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
}

const addArrow = (a, b) => a + b;

// If we use it something like this
*/

/*
var addExpr = function (a, b) {
    return a + b;
}

var addArrow = (a, b) => a + b;
*/

/*
// We will get an error message saying addExpr or addArrow is not a function,It's because var is hoisted with the value of undefined and when we will try to call it above treating it as a function it will throw an error with a different error message


// Example

console.log();
if (!numProducts) deleteShoppingCard();
var numProducts = 10;
function deleteShoppingCard() {
    console.log('All Products Deleted');
}
//It will still run the function even the var numProducts has a value of 10 because again var is hoisted as undefined and undefined is a falsy value and it will meet the requirements of the condition and hence the condition will run the function

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);


// Understanding the this keyword

// console.log(this);
function calcAge(birthYear) {
    console.log(2023-birthYear);
    // console.log(this);
}
calcAge(2003);

const  calcAgeArrow = birthYear => console.log(2023-birthYear); 
// console.log(this);
calcAgeArrow(2005);

const sandeep = {
    name: 'Sandeep',
    year: '2003',
    calcAge: function () {
        return 2023 - this.year;
        // console.log(this);
    }
}
console.log(sandeep.calcAge());
// sandeep.calcAge();

const jitu = {
    year: 2004,
}
jitu.calcAge = sandeep.calcAge;

console.log(jitu.calcAge());

// const f = sandeep.calcAge;
// f();        => It will throw an error because year is not defined under f and as it is just a regular function call, it is not attached to any object. There is no owner of that F function anymore


*/
/*
const sandeep = {
    name: 'Sandeep',
    year: '2003',
    calcAge: function () {
        // console.log(this);
        console.log(2023 - this.year);
        
        
        
        // It will throw an error because this under the isEligible function can't get the value even from it's parent function

        //One way to solve it is =>

        //Solution 1
        
        // const self = this; //Storing the this under a variable so that it will be able to perform scope chain lookup and take the value of this from there

           
        // const isEligible = function () {
        //     console.log(self.year >= 1990 && self.year <= 2005);
        // };

        //Solution 2

        //Using a arrow function

        const isEligible = () => {
            console.log(this.year >= 1990 && this.year <= 2005);
        }
        isEligible();
    },



    // greet: () => console.log(`Hey ${this.name}`), //It can't take the value of name variable because as I said arrow functions don't have it's own this keyword

    // however this issue can be fixed just by using a regular function

    greet: function () {
        console.log(this);
        console.log(`Hey ${this.name}`);
    }
}
sandeep.greet();
sandeep.calcAge();

const addExpr = function (a, b) {
    console.log(arguments); 
    return a + b;
}
addExpr(3, 5);
addExpr(3, 4, 5, 7);

//NOTE:  Arguments keyword only exists in regular functions and not in arrow function



let age = 20;
let oldAge = age;
age = 21;
console.log(age);
console.log(oldAge);

const me = {
    name: 'Sandeep',
    age: 20,
};

const friend = me;
friend.age = 17;
console.log("My age", me);
console.log("Friend's age", friend);

*/

//Primitive Types

let lastName = 'Soni';
let oldLastName = lastName;
lastName = 'Maurya';
console.log(lastName);
console.log(oldLastName);

//Reference Types

const jitu = {
    firstName: 'Jitendra',
    lastName: 'Gorain',
    age: 17,
};

const marriedJitu = jitu;
marriedJitu.lastName = 'Singh';
console.log(jitu);
console.log(marriedJitu);

//Copying Objects

const maru = {
    firstName: 'Abhishek',
    lastName: 'Marandi',
    age: 12,
    friends: ['Sanjay','Sonaram'],
}

const marriedMaru = Object.assign({}, maru); //Copying the value stored under the heap of maru to a newly created object {} , rather than in the above example where we just made two objects and stored it under a same address with same value

marriedMaru.lastName = 'Dutta';
// console.log("Last name of Maru before Marrige was", maru.lastName);
// console.log("Last name of Maru after Marrige is now", marriedMaru.lastName);

/*
NOTE:-

Object.assign() creates just a shallow copy and not a deep clone which is what we would like to have. Which means, it only copies the properties in the first level while a deep clone would copy everything

for example if we store an object under a object, it will stll be same.

which has shown above and below:-

1. Storing a array under the maru object with the name of friends.

2. Adding/Pushing more values under the marriedMaru.friends array, but the values changed in both marriedMaru and Maru while we made a copy of maru using Object.assign(),

So this is what shallow copy means
*/
marriedMaru.friends.push('Krishna');
marriedMaru.friends.push('Monu');

console.log("maru", maru);
console.log("marriedMaru", marriedMaru);