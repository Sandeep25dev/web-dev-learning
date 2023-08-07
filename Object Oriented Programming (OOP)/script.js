'use strict';

// A constructor function always starts with capital letters

//  CONSTRUCTOR FUNCTION  //
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const sandeep = new Person('Sandeep', 2003);
console.log(sandeep);

// 1. New empty() is created
// 2. function is called, where the this keyword will be the new empty object
// 3. new empty object is linked to a prototype
// 4. function automatically return {}

const maru = new Person('Maru', 2005);
const jitu = new Person('Jitu', 2004);
// console.log(jitu);
// console.log(maru);
console.log(maru instanceof Person);

///// Prototypes /////
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

sandeep.calcAge();
// Just watch the code to know how that worked it's quite easy actually

console.log(sandeep.__proto__);
console.log(sandeep.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(sandeep));
// Will return true as the Person.prototype is the prototype of sandeep object

console.log(Person.prototype.isPrototypeOf(Person));
// Will return false because the Person.prototype is not the prototype of Person which is actually a constructor function

// If you want think it in a easy way you can consider the .prototype as .prototypeOfLinkedObjects (It's not a real method)

Person.prototype.nationality = 'Indian';
console.log(sandeep, maru);
console.log(sandeep.nationality, maru.nationality);

console.log(sandeep.hasOwnProperty('firstName'));
console.log(sandeep.hasOwnProperty('nationality'));

console.log(sandeep.__proto__);
console.log(sandeep.__proto__.__proto__);
// Object.prototype (top of the prototype chain)

console.dir(Person.prototype.constructor);

const arr = [23, 34, 54, 23, 42, 4, 4, 52, 54, 11, 42, 11];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
