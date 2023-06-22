'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Sandeep Kumar',
  movements: [200, 455.23, -306.5, 20000, 30000, -25000, -642.21, -133.9, ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-06-14T14:11:59.604Z',
    '2023-06-15T17:01:17.194Z',
    '2023-06-18T23:36:17.929Z',
    '2023-06-19T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-IN', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'hi-IN',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  // console.log(date);
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  
  const daysPassed = calcDaysPassed(new Date(), date)
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = String(date.getDate()).padStart(2, 0);
    // const month = String(date.getMonth() + 1).padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    // Other Way of formatting the date
    return new Intl.DateTimeFormat(locale).format(date);
  }
  
 
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
      } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}₹</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `₹${acc.balance.toFixed(2)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₹${incomes.toFixed(2)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₹${Math.abs(out).toFixed(2)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `₹${interest.toFixed(2)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// Fake Always Logged In
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;





btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    ///// Create Current Date and Time

    // Enhanced Method //
    const today = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'numeric',
      month: 'long',
      // month:'2-digit',
      year: 'numeric',
      weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(today);
    
    // Other way of doing the same thing :-

    // const now = new Date();
    // const day = String(now.getDate());
    // const month = String(now.getMonth() + 1);
    // const year = now.getFullYear();
    // const hour = String(now.getHours()).padStart(2, 0);
    // const min = String(now.getMinutes()).padStart(2, 0);
    // labelDate.textContent = `${day.length <= 1 ? 0 + day : day}/${month.length <= 1 ? 0 + month : month}/${year}, ${hour}:${min} ${hour < 12 ? 'AM' : 'PM'}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date());
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.acc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

// Converting and Checking Numbers

console.log(Number('23'));
console.log(+'23'); // Using the + operrand will convert the string into a number because of type coersion

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10)); // It will return NaN because the first letter is not a number


console.log(Number.parseInt('2.5rem')); // It will only return the integer part and not the decimal part
console.log(Number.parseFloat('2.5rem')); // It will return the decimal part as well


//// To check if any value is a number

console.log(Number.isNaN('23'));
console.log(Number.isNaN(23));
console.log(Number.isNaN(+'23X'));

console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
// Consider this method to check if any element is a number or not

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

////// Mathemetical Methods (Math methods) //////

console.log(Math.sqrt(25));
//Same could be achieved by using exponentian
console.log(25**(1/2));
console.log(8 ** (1 / 3)); // To calculate a cubic root

// Maximum Value of Numbers
console.log(Math.max(23,45,12,3,12,34));

// Minimum Value of Numbers
console.log(Math.min(23,34,12,53,2,33));

// Using the PI value
console.log(Math.PI);
// Calculating the Area of a circle using PI
console.log(Math.PI * Number.parseFloat('10px') ** 2);


////// Generating Random Numbers ////////
console.log(Math.trunc(Math.random() * 6) + 1); // A random number will be generated between 1 - 6

// A function to return numbers between min and max

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10,20));

////// Rounding Integers ////////

console.log(Math.trunc(23.3));

console.log(Math.round(24.3));
console.log(Math.round(24.7)); 
// Calculates Round Figures

console.log(Math.ceil(43.3));
console.log(Math.round(43.8));

console.log(Math.floor(34.3));
console.log(Math.floor(34.8));
/// .floor method works the same way as the trunc method while dealing with positive numbers

// But when negative numbers

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3)); // it works the other way around while dealing with negative numbers


// Rounding Decimals

console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.235).toFixed(2));
console.log(+(2.434).toFixed(2)); // Coverting the result into a number



// The Remainder Operator (Modulo/Modulas)

console.log(5 % 2); // 5 = 2 * 2 + 1 (1 is the remainder)
console.log(8 % 3); // 8 = 2 * 3 + 2 (2 is the remainder)


const isEven = num => num % 2 === 0 ? `${num} is an even number` : `${num} is an odd number`;

console.log(isEven(2));
console.log(isEven(3));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6, 8
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'cyan';
  })
})


/// Numeric Seperators

// const diameter = 287460000000;
const diameter = 287_460_000_000;
console.log(diameter);


/// Working with BigInt

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(456469473535455656655754723n); // Adding 'n' at the last of too much numbers converts it into BigInt

// Another Method of creating numbers

console.log(BigInt(4557545));


// Operations

console.log(10000n + 10000n);
console.log(676873535735769n * 57554n);
const huge = 57768735735n
const num = 25;
console.log(huge * BigInt(num));

// NOTE: We cannot mix BigInt with other data types such as regular numbers

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

console.log(huge + ' is Really big!!!');


///// Creating Dates //////

const now = new Date();
console.log(now);

console.log(new Date('Jun 19 2023 14:08:30'));
console.log(new Date('25 September 2003'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2025, 8, 25, 15, 34, 4));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//// Working with Dates

const future = new Date(2025, 10, 12, 12, 45);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(1762931700000));

/// If you just want the time stamp of present only then you can use the following method

console.log(Date.now());

future.setFullYear(2069)
console.log(future);


const future = new Date(2025, 10, 12, 12, 45);
// console.log(Number(future));
// console.log(+future); // Other way of converting the date into number

// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60*24);
// const days1 = calcDaysPassed(new Date(2025, 10, 12), new Date(2025, 11, 21));

// console.log(days1);

*/
