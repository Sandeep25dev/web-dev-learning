'use strict';
/*
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 7000 * numPassengers) {
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH320',);
createBooking('BN420', 2, 16000);
createBooking('A320', 4)

/////////////////////////////////////////////////////////////////////////////

//The default parameters can contain any expression


const flight = 'A320';
const sandeep = {
    name: 'Sandeep',
    passport: 46123146752
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'B420';
    passenger.name = 'Mr' + passenger.name;
    
    if (passenger.passport === 46123146752) {
        alert('Check In!')
    } else {
        alert('Wrong Passport !')
    }
};

checkIn(flight, sandeep);
console.log(flight);
console.log(sandeep);


const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

// console.log(oneWord('HEy  what are     you doing'));

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
    
};

// console.log(upperFirstWord('hey guys how are you'));


//  Higher Order Function

const transformer = function (str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed Sring: ${fn(str)}`);
    console.log(`Function Name: ${fn.name}`);
};

transformer('JavaScript is the Best Language',upperFirstWord);
transformer('JavaScript is the Best Language',oneWord);

// JS uses callbacks all the time

const high5 = function () {
    console.log('👋');
};

document.body.addEventListener('click', high5);

/////////////////////////////////////////////////////////////////////////////

// Functions returning functions

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
};
//As the greet function is itself returning a function---->
const greeterHey = greet('Hey'); //So when the variable greeterHey's value is assigned by calling  the greet function setting the parameter as ('Hey') string then it basically calls the greet function and the greet function returns a function which makes the variable greeterHey Itself a function

greeterHey('Sandeep');
greeterHey('Jitu')

greet('Hello')('ShaKuSo');

// Doing the same operation using Arrow Function
const greet2 = (greeting) => function (name) { console.log(`${greeting} ${name}`); };

greet2('Hello')('Sir')

const greeterHello = greet2('Hello');
greeterHello('Guys');

// There is one more way of doing the above operation more simplistic but could be a litte hard to understand

const greet3 = greeting => name => console.log(`${greeting} ${name}`);


greet3('Hey')('Dude');

const greeter3 = greet3('Yo!');
greeter3('Boy');



const lufthansa = {
    airline: 'Lufthansa',
    iatacode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`);
        this.bookings.push({flight: ` ${this.iatacode}${flightNum}`, name})
    },
    
};

lufthansa.book(239, 'Sandeep');
lufthansa.book(635, 'Jitu');

console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iatacode: 'EW',
    bookings: [],
    
};

const book = lufthansa.book;
// The CAll Methods :--
book.call(eurowings, 343, 'Maru');
// console.log(eurowings);
book.call(lufthansa, 545, 'Sanjay');
// console.log(lufthansa);
// The call method basically points that which function is should called in order to determine the 'this' keyword. If you'll try to simply call the function like this:- book(455, 'Sandeep') then it will throw an error because then the this keyword will be undefined

const swiss = {
    airline: 'Swiss Air Lines',
    iatacode: 'LX',
    bookings: [],
};

book.call(swiss, 609, 'John Wick');

// APPLY Method

const flightData = [312, 'Steve Rogers'];
book.apply(swiss, flightData);

// The apply method works exactly the same as the Call method but the difference is that Call method can take arguments within it whereas the apply method needs to be passed on the data containing on an Array

// Well the apply method is not getting used in the modern JavaScript anymore

book.call(swiss, ...flightData); // This is the same as the above statement and will give the same output as well


// Bind Method

// book.call(eurowings, 343, 'Maru');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss)
bookEW(696, 'Naruto Uzumaki');
bookLH(344, 'Sasuke Uchiha');


// What we basically did here is we made a sepatare variable for each objects and bound it with the book variable which will speacfy that how the this keyword will be used

// So now we instead of calling the function using the call method to specify that from which object we want to use the book variable (which is a function) now what we did is we bound it with a separate function itself which is now itself a function

// Means the vaiable where we used the bind method is now itself a function which will itself return a function

// *************** Make sure to do some of your coding too using this bind method**************


const bookEW43 = book.bind(eurowings, 43);
// We have assigned the first parameter of the book method as 43 means now the flightNum parameter is now presetted as 43, so now the only parameter which we need is the name parameter

bookEW43('Kakashi Uzumaki');

// With Event Listeners

lufthansa.planes = 200;
lufthansa.buyPlanes = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
// lufthansa.buyPlanes()

// My method
// const buyPlanesMethod = lufthansa.buyPlanes;
// const buyPlanesForLufthansa = buyPlanesMethod.bind(lufthansa)
// document.querySelector('.buy').addEventListener('click', buyPlanesForLufthansa)

// Jason's Method (Also the better and convinient method)
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlanes.bind(lufthansa))

// Partial Applications

const addTax = (rate, amount) => amount + amount * rate;
console.log(addTax(0.1,200));

const addGST = addTax.bind(null, 0.18); // Setting default parameteres for a object method

console.log(addGST(100));


const addTaxFn = function (rate) {
    return function (amount) {
        return amount+amount*rate
    }
    
};

const addGSTfn = addTaxFn(0.18);

console.log(addGSTfn(200));


const normalFn = function () {
    console.log("This will run only once");
};

normalFn();

(function () {
    console.log("This will run only once");
})();

// For Arrow Functions
(() => console.log("This will ALSO run only once"))();


const secureBooking = function () {
    let passengersCount = 0;
    
    return function () {
        passengersCount++;
        console.log(`${passengersCount} passengers`);
    }
};

const booker = secureBooking();

booker()
booker()
booker()
*/

// More closures examples

// Example 1

let f;
const g = function () {
    const a = 28;
    f = function () {
        console.log(a * 2);
    }
};

const h = function () {
    const b = 10;
    f = function () {
        console.log(b * 2);
    }
};

g();
f();
console.dir(f);

// Reassigning the 'f' variable

h();
f();

console.dir(f);


// Example 2

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are boarding with all ${n} passengers`);
        console.log(`There are three groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`We will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3)

