'use strict';

/*
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


*/
// CLASSES //

// Class expression
const PersonCl2 = class {};

// Class Declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods
  calcAge() {
    return 2023 - this.birthYear;
  }
  get age() {
    return `${this.fullName} is ${2023 - this.birthYear} years old`;
  }

  // Set a property that already exists (IMP) //

  set fullName(name) {
    // console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
  // Static Method: meaning this method will only work for the constructor where it declared like in this case it will only work in this PersonCL class as it doesn't gets added to the prototype property so no other objects can access this like in the instances which gets added to the prototype property from there other objects can acccess that as well

  // Static Method
  static hey() {
    return 'Hey there! 👋';
  }
}

const sanjay = new PersonCl('Sanjay Mehta', 2000);
console.log(sanjay);
console.log(sanjay.calcAge());
console.log(sanjay.age);

PersonCl.prototype.greet = function () {
  return `Hey ${this.fullName}! you're welcome😊`;
};
console.log(sanjay.greet());
console.log(PersonCl.hey());

// NOTES :-

//1. Classes are NOT hoisted meaning we cannot use them before they're declared as we do in the function declaration.

//2. Classes are also first-class citizens just like functions.

//3. Classes are executed in Strict mode

//4.

//// GETTERS AND SETTERS ////

// const walter = new PersonCl('Walter', 1994); // Will throw the defined alert in case of missing the last name

const walter = new PersonCl('Walter White', 1994);
console.log(walter.fullName);

const account = {
  owner: 'Sandeep',
  movements: [200, 800, 500, 8000, 5208],
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 3201; // Setting a latest value
console.log(account.movements);

const PersonProto = {
  calcAge() {
    return 2023 - this.birthYear;
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const krish = Object.create(PersonProto);
console.log(krish); // Right now it's just an empty object with the inheritance of the prototype of PersonProto

// Setting up some elements under the object
krish.name = 'Krishna Choudhary';
krish.birthYear = 2000;
console.log(krish); // Now it will return the object with the setted elements
console.log(krish.calcAge());

const sonaram = Object.create(PersonProto);
sonaram.init('Sonaram Soren', 2003);
console.log(sonaram, sonaram.calcAge());
