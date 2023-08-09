'use strict';

/*

/// Coding Challenge #1 ///

Your tasks:

1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in 
km/h

2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console

3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK 
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed += 10) + 'KM/h';
};
Car.prototype.brake = function () {
  return (this.speed -= 10) + 'KM/h';
};

const verna = new Car('Verna', 80);
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
// console.log(verna.accelerate());
// console.log(bmw.accelerate());
// console.log(mercedes.accelerate());
// console.log(verna.brake());
// console.log(bmw.brake());
// console.log(mercedes.brake());

/*
/// Coding Challenge #2 ///

Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)

3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)

4. Create a new car and experiment with the 'accelerate' and 'brake'methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h

GOOD LUCK 
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    return `${this.make} is going at ${this.speed} KM/h`;
  }
  brake() {
    this.speed -= 5;
    return `${this.make} is going at ${this.speed} KM/h`;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(spd) {
    this.speed = spd * 1.6;
  }
}

const ford = new CarCl('Ford', 180);
console.log(ford.speedUS);
console.log(ford.speed);
console.log(ford.accelerate());
console.log(ford.accelerate());
console.log(ford.brake());
ford.speedUS = 50;
console.log(ford);
