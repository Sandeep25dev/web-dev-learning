'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
  

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  
  // const [fType, flFrom, flTo, flTime] = [type.slice(1).replace('_', ' '), from.slice(0,3).toUpperCase(), to.slice(0,3).toUpperCase(), time.replace(':', 'h')];
  // const output = `${fType} from ${flFrom} to ${flTo} (${flTime})`;
  // console.log(`${output.padStart(41)}`);

  const output = `${type.startsWith('_Delayed') ? '🛑' : ''} ${type.slice(1).replace('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(45);
 
 console.log(output);

  

  // const correct = flight.replace(':', 'h').replace(';',' from ').replace('_',' ');
  // console.log(correct);
}


// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// The above object is called Object Literal because we literally wrote the whole object  
const restaurant = {
    name: 'Classico Italiano',
    location: 'Sector 4, Bokaro, Jharkhand',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    order: function (starterIndex, mainIndex) {
      return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //This is not destruturing yet.
    },
    //When sometimes we have a lot of parameters and it gets hard to know the order of those parameters, So instead of defining those parameters manually  what we can do is to just pass an object into the function as an argument, and then the function will immediately destructure that object.
    /*
    openingHours: {
      thu: {
        open: 12,
        close: 22,
      },
      fri: {
        open: 11,
        close: 23,
      },
      sat: {
        open: 0, // Open 24 hours
        close: 24,
      },
    },
    */
   // Old  Method
   // openingHours: openingHours, // Restoring or copying the Opening Hours object from outside
   
   //ES6 Enhanced Object Literals
   openingHours, // Yeah as simple as this, Just write the name of that outside object name which you want to put under some other object.
 
 
   
   orderDelivery: function({starterIndex = 1, mainIndex = 0, time = '22:00', address}) {
     console.log(`Order Received! Your ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }, 
    
    // The 2nd ES6 Enhancement is about the methods(functions stored under objects) In ES6 we can simply write the methods syntax like this:-  
    orderPasta(ing1, ing2, ing3) {
      console.log(`Here is your delicious Pasta with ${ing1}, ${ing2} and ${ing3}`);
    },// Prefer this syntax
    
    orderPizza(mainIngridient, ...otherIngridients) {
      console.log(mainIngridient);
      console.log(otherIngridients);
    }
    
  };
/*
  /////////////////////////////////////////////////////////////////////////////
  
  // Woking with Strings (Part -2)
  
  
  // Split and Join
console.log('a+very+nice+string'.split('+'));
console.log('Sandeep Kumar'.split(' '));

const [firstName, lastName] = 'Sandeep Kumar'.split(' ')
console.log(firstName);
console.log(lastName);
const newName = ['Mr', firstName, lastName.toUpperCase()].join('-');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // Other way of doing the above operation in a more efficient way
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('leonardo da vinci');
capitalizeName('sandeep kumar');


// Padding

const message = 'Go to gate 23!'
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Sandeep'.padStart(25, '-').padEnd(35,'-'));

const maskCreditCard = function (number) {
  const str = String(number);
  const last = str.slice(-4);
  return last.padStart(str.length, '*')
};

console.log(maskCreditCard(23425235325));
console.log(maskCreditCard(43523523532543543));
console.log(maskCreditCard('4352352353254234'));

// Repeat

const msg = 'Bad weather... All Departures Delayed... '
console.log(msg.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in Line ${'✈️'.repeat(n)} `);
};
planesInLine(10);
planesInLine(3);






////////////////////////////////////////////////////////////////////////////

// Working with Strings (Part -1)

const airline = 'Air India, Osaka';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('i'));
console.log(airline.indexOf('India'));
console.log(airline.slice(4));
console.log(airline.slice(4, 9));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ')+1));
console.log(airline.slice(-2));
console.log(airline.slice(1,-1));

const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the Middle Seat 🫠');
  else {
    console.log('You Got Lucky🥳');
  }
};

checkMiddleSeat('11B')
checkMiddleSeat('69A')
checkMiddleSeat('45E')

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
const passenger = 'sAndEEp';
const passengerLower = (passenger.toLowerCase());
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'sandeepofficial250903@gmail.com'
const inputEmail =  '    SandeepOfficial250903@gmail.com  \n'
const lowerCaseEmail = inputEmail.toLowerCase();
const trimmedEmail = lowerCaseEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = inputEmail.toLowerCase().trim();
console.log(normalizedEmail);

// Replacing

const priceRS = '2,000₹';
const priceUS = priceRS.replace('₹', '$').replace(',','.');
console.log(priceRS);
console.log(priceUS);
const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door','gate'));

// Replacing all the occurance by using regular expression
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Air'));
console.log(plane2.endsWith('neo'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW Airbus');
};

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log("You cannot aboard Sir 😐");
  }
  else {
    console.log('You are Good to Go Sir😊');
  }
};

checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and camera')
checkBaggage('Got some snacks and a gun for my protection')



////////////////////////////////////////////////////////////////////////////
// Maps

const question = new Map([
  ['question', 'What is the best Programming Language in the World?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct🥳'],
  [false, 'Try Again'],
]);
console.log(question);  

// Convert Object into Map

console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz App

// console.log(question.get('question'));
// for (const [keys, values] of question) {
  //   if(typeof keys === 'number') console.log(`Answer ${keys}: ${values}`);
  // };
// const answer = Number(prompt(question.get('question')));
// if (answer) {
//   if (answer === question.get('correct')) {
//     alert(question.get(true));
//   } else {
//     alert(question.get(false));
//   }
// };
// console.log(answer);

// Convert a Map back to an Array

console.log([...question]);
// console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
  
//////////////////////////////////////////////////////////////////////////

// Maps Fundamentals:

const hotels = new Map();
hotels.set('Name', 'Atithi Bhawan'); // .set is used to add elements to the Map
hotels.set(1, 'Bokaro, Jharkhand');
console.log(hotels.set(2, 'Kolkata, West Bengal')); 
hotels.set('Services', ['Banquet Hall', 'Single Bed Rooms', 'Master Bed Rooms', 'Hall Parties']).set('open', 11).set('close', 23).set(true, 'We are Open!').set(false, 'We are Closed!');

console.log(hotels.get('Name'));
console.log(hotels.get(true));
console.log(hotels.get(false)); 
console.log(hotels.get(1)); 
console.log(hotels.get(2)); 

const time = 21;
const query = hotels.get(time > hotels.get('open') && time < hotels.get('close'));
console.log(query);
console.log(hotels.has('Services'));
// hotels.delete(1); // To delete Elments from a Map
// hotels.clear(); // To clear everything
// console.log(hotels.has(1));
console.log(hotels.size);
const arr = [1, 2];
hotels.set(arr, 'Test');
console.log(hotels.get(arr));
hotels.set(document.querySelector('h1'), 'Heading');
console.log(hotels);


//////////////////////////////////////////////////////////////////////////

// Sets Fundamentals

const ordersSet = new Set(['Noodles', 'Biryani', 'Momos', 'Dosa', 'Pav Bhaji', 'Biryani', 'Momos', 'Biryani', 'Biryani']);
console.log(ordersSet); // All the duplicates are GONE
console.log(ordersSet.size); // We use size in sets and not length which use use in other iterables like arrays and strings
console.log(ordersSet.has('Biryani')); // We use 'has' in sets and not 'includes'
console.log(ordersSet.has('Garlic Bread'));
ordersSet.add('Garlic Bread'); // Adding more elements to the sets
console.log(ordersSet.has('Garlic Bread'));
ordersSet.delete('Momos');
// ordersSet.clear(); // It will clear the set 
console.log(ordersSet);

for (const order of ordersSet) {
  // console.log(order);
};

const staff = ['Waiter','Manager', 'Chef', 'Waiter', 'Chef', 'Head Chef', 'Helper'];
console.log(staff);
// const ArrangedStaff = new Set(staff)
// console.log(ArrangedStaff);
// const staffNew = [...ArrangedStaff];
// console.log(staffNew);
// console.log(staffNew[3]);

// More Convinient Way

const staffTypes = [...new Set(staff)];
console.log(staffTypes);
console.log(staffTypes[3]);
console.log(new Set('sandeepkumar').size); // It will console how many unique letters are present in my names


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Looping Over Objects (Indirect Way)

// Properties NAMES
const properties = Object.keys(openingHours);
console.log(properties); // You can see it will console the obove variable as an array containing 3 properties as ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days:`;
for (const day of Object.keys(openingHours)) {
  openStr+= ` ${day},` // Modified the openStr variable
};
console.log(openStr);

// Properties VALUES
const values = Object.values(openingHours);
console.log(values);

// ENTIRE Object

const entries = Object.entries(openingHours);
// console.log(entries); 
for (const [day,{open,close}] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}; // In the palce of the day variable we can use any name on that place and also one thing that it has nothing to do with the other outer variable with the same name... It is completely a different varialbe which works only for the loop and stays under the loop.


////////////////////////////////////////////////////////////////////////////
// Optional Chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

  //With Optional Chaining
console.log(restaurant.openingHours.mon?.open); 
// Usefull for avoiding bugs and writing clean code. Mark it as important
// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? '10'; // Open doesn't exist then the default value will set to 10
  console.log(`On ${day}, we open at ${open}`);
};

// Optional Chaining on METHODS

console.log(restaurant.order?.(0,2) ?? "Method doesn't exist"); //If the method doesn't exist then the it will console the default value "Method doesn't exist"

console.log(restaurant.orderBiryani?.(0,2) ?? "Method doesn't exist"); 

// Optional Chaining on ARRAYS

// const users = [{ name: 'Sandeep', email: 'sandeepofficial250903@gmail.com' }];
const users = [];

console.log(users[0]?.name ?? 'Users Array empty');

// Doing same thing using if else statements which is a way too much lengthy
if (users.length > 0) console.log(users[0]?.name);
else console.log('Users Array empty');

///////////////////////////////////////////////////////////////////////////
// Looping ARRAYS : The FOR-OF Loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);
// THE FOR OF LOOP
for (const item of menu) console.log(item);

// What if we wanted to print the index number with it too. We can do that like this:-
for (const item of menu.entries()) {
  // console.log(`${item[0] + 1} : ${item[1]}`);
}
//Destructuring the Above loop
for (const [i, el] of menu.entries()) {
  console.log(`${i+1} : ${el}`);
}



/////////////////////////////////////////////////////////////////////
// New LOGICAL Assignment Operators
const rest1 = {
  name: 'Deli Trea',
  // numGuests: 20,
  numGuests: 0, // The OR operator will treat it as a falsy value and will skip it
};
const rest2 = {
  name: 'Deroniya',
  owner: 'ShaKuSo'
};
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// Better way to initialize the above operation but in more concized way by using a new ASSIGNMENT Operator :-

//Logical 'OR' assignment operator
// rest1.numGuests ||= 10;  
// rest2.numGuests ||= 10;

//Logical NULLISH assignment Operator
rest1.numGuests ??= 10; 
rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

// Using the && operator to replace the value 

// rest2.owner = rest2.owner && '<ANONYMOUS>'; // It works because of short cuircuiting when the JS checks for the rest.owner it finds it to be truthy value so the second statements gets executed. It will be useful we want to replace the value under a object but sometimes we might don't know whether that varible exists or not... If that variable exists then change the value of it.

console.log('--After Replacing--');
// console.log(rest2);
// We can do the above operation more simply by just the AND Assignment Operator

// AND Assignment Operator
rest1.owner &&= '<ANONYMOUS>'; 
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1); // It wont console the owner because it does not content the owner variable.
console.log(rest2);

/////////////////////////////////////////////////////////////////
// THE NULLISH COALESCING OPERATOR (??)
restaurant.numGuests = 0 // 0 is still a considerable value but at the same time it is a falsy value as well so in the below statement it will be skipped as it's a falsy value.

const guests2 = restaurant.numGuests || 10;
console.log(guests2);
// We can fix this issue by doing this
const guestCorrect = restaurant.numGuests ?? 10; // It works same as OR operator but only the Nullish values gets rejected
console.log(guestCorrect);
//It works because Nullish Values are: null and undefined (NOT 0 or '')
// Short Circuiting (&& and ||)

// There are three properties about logical operators which are :-
//They can use ANY data type, they can return ANY data type and they can do short circuiting (Short Circuit Evaluation)

// Short Circuiting means that if the first value is a truthy value then it will immidietely return that first value, and if the first value is a truthy value then the later value wont even be evaluated, which means JavaScript won't even look at it.
///// OR Opeartor /////
console.log('---- OR Operator ----');
console.log(4 || 'Sandeep');
console.log('' || 'Sandeep');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Confirm' || 23 || null);
// restaurant.numGuests = 24;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);
// Althouh if we assigned the value of 0 in the restaurant.numGuests then if will be treated as a falsy value and wont return it where 0 is a cinsiderable value. Well we will solve that later

console.log('---- AND Operator ----');
// The AND operator (&&) works kind of opposite to the OR operator (||). OR operator checks where the first value is truthy or falsy, if it's truthy then returns it otherwise if it's a falsy value then evaluates other values untill it finds a truthy value and then returns it. Where the AND operator if it finds the first value falsy then returns it anyway without even checking or evaluating the other values because it determines if the first value is falsy then the overall result will be falsy anyway... And if it finds the first value to be truthy and the others as well then returns the last value of it.

console.log(0 && 6);
console.log(5 && 'Sandeep'); // If it will find the first value to be truthy and the others as well then will  return the last value

console.log('Sandeep' && 23 && null && 'Hey'); //wherever it will find a false value it will return that false value and  won't even check the next other values 

// Practical Example

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'panner')
}
//simple way of doing the above example using the && operator
restaurant.orderPizza && restaurant.orderPizza('Capsicum', 'Jalepenos') // I t will check whether the element/method restaurant.orderPizza exists or not, If it exisits then it will run the second element where we are calling the function


///////////////////////////////////////////////////////////////////////
// REST PATTERN AND PARAMETERS

// The Rest Pattern is kind of quite opposite to Spread Operator which takes value from an array or iterables and expand it into individuals where the rest pattern will take individual values and packs element into an array

// 1) Destructuring:

//SPREAD Operator because on RIGHT side of = (Assignmenet Operator)
const arr = [1, 2, 3, ...[7, 8, 9]];

// REST, because on the LEFT side of = (Assignmenet Operator)
const [a, b, ...others] = [1, 2, 3, 4, 5, 6]; ///Packing the rest elements of that array into a variable named others
console.log(a, b, others);
const [pizza, , risotto, ...otherFoods] = [...restaurant.mainMenu, ...restaurant.starterMenu]; //The rest pattern always should be at the end of destructuring assignment so that it will know which rest elements are needed to be wrapped up into a single variable. And also it will throw an error if we wont put it one the last position at the destruturing assignment

// Rest pattern in OBJECTS

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

console.log(pizza, risotto, otherFoods);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
  
};

add(2, 4);
add(2, 4, 6, 4);
add(2, 4, 6, 4, 6);

const x = [23, 34, 566];
add(...x); // Here we took an array and unpacked it and send it to the function parameters

restaurant.orderPizza('mushrooms', 'onion', 'panner', 'capsicum', 'olives'); // mushroom will be put into a single parameter and the rest of them will be packed and put into the otherIngridients parameter  

///////////////////////////////////////////////////////////

// restaurant.orderPasta('Cheese', 'Grilled Chicken', 'Oester Sauce')

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Jahira More, Chas',
//   mainIndex: 2,
//   starterIndex: 2,
// });
 

// restaurant.orderDelivery({address:'Sonabaad Road,Chas'})

// Spread Operator (...)
const arr = [40, 76, 22];
const badNewArray = [32, 34, 54, arr[0], arr[1], arr[2]]; // Worst Practice
console.log(badNewArray);

//Doing the same operation using the spread operator.
const newArr = [21, 43, 90, ...arr]; //Invoking the spread operator using three dots after a the coma (...) It basicallly takes the elments stored under that array and writes it individually

console.log(newArr);
console.log(...newArr); //It individually consoled the contents stored under that newArr
// Expanding or adding new contents to any array stored under an object
const newMenu = [...restaurant.mainMenu, 'Indian Chicken Biryani'];
console.log(newMenu); // NOTE: We are not manipulating the resturaunt

// Copying an array
const mainMenuCopy = [...restaurant.mainMenu]; //This is similar to Object.assign but this is a lot easier to use 
restaurant.mainMenu.push('Chicken Biryani')

//Join 2 Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menu);

//Iterables are: Strings, Arrays, maps, sets, NOT Objects

//Using the spread method in Strings
const str = 'Sandeep';
const letters = [...str, ' ', '.K']
console.log(letters);
console.log(...str); //We will get the output of the strings individually
//NOTE: We cannot use the spread operator in template literals

//Real World Example

const ingridients = [prompt("Let's Make Pasta! Ingridient 1?"), prompt("Ingridient 2?"), prompt("Ingridient 3?")]


restaurant.orderPasta(ingridients[0], ingridients[1], ingridients[2]);
restaurant.orderPasta(...ingridients);


// Objects
const newRestaurant = {foundedIn:2029, ...restaurant, name: 'Indian Fresh', founder: 'Sandeep Kumar' };
newRestaurant.mainMenu.push('Kadhai Chicken')
newRestaurant.starterMenu.push('Chicken Tikka')
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Deli Trea';
console.log(restaurantCopy.name);
console.log(restaurant.name);

///////////////////////////////////////////////

//   DESTRUCTURING OBJECTS

To DESTRUCTURING objects, we will use {}

//Basic way of destructuring objects
const { name, openingHours, categories } = restaurant; // objects should be called by same name as assigned  

// But what if we want to use the elements stored under that object and assign a different name for it
// Well we can that by doing this
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant; // objects should be called by same name as assigned  

// Setting a default value to an destructuring object

const { menu = [], starterMenu: starters = [] } = restaurant; //Hence we don't have any element under the restaurant oject named 'menu' so we have assigned a default value to an empty array, also we have copied the value of startersMenu and assigned it with a different name and also setted up to a default value of an empty array [] but hence starters already got the content of starters menu, it wont show the default value.

console.log(menu, starters);

console.log(name,openingHours, categories);
console.log('Reassigned Output:' ,restaurantName,hours, tags);

// Mutating Variables
let a = 69;
let b = 6969;
const obj = { a: 91, b: 89, c: 60 };

({ a, b } = obj);  // we have to store the destructuring assignments into parenthesis ()

// Destructuring Nested Objects
const { fri: { open, close } } = openingHours;
// If we want to copy and change the name of the elements into something else, we can do that like this

const { fri: { open: o, close: c } } = openingHours;

console.log("Open at",open,"Close at",close);
console.log("Open at",o,"Close at",c, "(Renamed Variable)");


console.log(a, b);

*/
//////////////////////////////////////////////

//   DESTRUCTURING ARRAYS
/*
const arr = [2, 4, 5];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; //Destructuring the array
console.log(x, y, z);
console.log(a, b, c);
console.log(arr);


// const [first, second] = restaurant.categories; // By default it will take the the first two elements from the restaurant array,
//But if we need to skip between elements we can do this
// const [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// Suppose we need to switch the two variables without destruturing, then we would have to do it like this:-
let [main, , secondary] = restaurant.categories; //We need to change the variable type from const to let because we gonna reassign the value.
console.log(main, secondary);

//This is a normal method and not destructuring! 

*/
/*
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// Now doing the same thing using destructuring

[main, secondary] = [secondary, main] // Destructuring Method
console.log(main, secondary);
//This method is a lot easier and also we don't need a temporary variable here

// Destructuring
console.log(restaurant.order(0, 2)); //Without destructuring 

// Receive 2 return values from a function
const [starter, mainCourse] = (restaurant.order(0, 2)); // Doing Destructuring

console.log(starter, mainCourse);


//     NESTED DESTRUCTURING

// What if we wanted to destructuring of a nested array, means taking the value of an array which is already stored under an array.

const nested = [4, 5, [7, 8]];
// const [i, , j] = nested;
//It will console the array as a whole and wont do it separately

const [i, , [j, k]] = nested; //Destructuring in a way so that it can produce values individually
console.log(i, j, k);


 //    DEFAULT VALUES

// const [p, q, r] = [5, 6]; 
// console.log(p, q, r); // We will get undefined because r is not defined

//What else we can do is

const [p = 1, q = 1, r = 1] = [5, 6]; //Setting up default values as 1
console.log(p, q, r);

*/