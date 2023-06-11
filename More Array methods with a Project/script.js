'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function (movements, sort) {
  containerMovements.innerHTML = ''; // Inner HTML is similar to .textContent statement the difference is .textContent is used to only configure the text content of the elements where the innerHTML can be used to configure the whole HTML element

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}₹</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  })
}

// let balanceData;

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `₹${acc.balance}`
  // balanceData = balance;
};

// calcDisplayBalance(account1)
// console.log('BAL- ',balanceData);


// const createUsername = function (user) {
//   const username = user.toLowerCase().split(' ').map(function (name) {
//     return name[0]
//   }).join('');
//   return username;
// };

const displaySummary = function (acc) {
  const deposits = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₹${deposits}`;
  
  const withdrawls = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₹${Math.abs(withdrawls)}`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter(mov=>mov>1).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `₹${interest}`

};

const createUsername = function (accnts) {
  accnts.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(function (name) {
      return name[0]
    }).join('');
  })
  
};

createUsername(accounts)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  displaySummary(acc);
}
///////// Event Handlers //////////

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); 
    
    // Update UI

    updateUI(currentAccount)

  } 
})

/// Implementing Transfers ///

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI

    updateUI(currentAccount);
  }

})

// Testing the request loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  
  const amount = Number(inputLoanAmount.value)
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

})

// Made this request loan feature all by myself😁

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    // console.log('pass');
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    
    // Delete Account
    accounts.splice(index, 1);

    // console.log(index);

    // Hiding the UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//////////////// ARRAY METHODS  //////////////////

let arr = ['a', 'b', 'c', 'd', 'd', 'e'];

/*
///// SLICE METHODS /////

console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2)); // between From start at position [1] and from last at position[-2]

console.log(arr.slice()); // if we wont pass any arguements to the slice method then it will return the array as it is.

console.log([...arr]);
// It's the same thing as done above


///// SPLICE METHOD /////

console.log(arr.splice(2)); // It actually slice the part of the actual array and stores it under it unlike the slice method which only just takes a copy.

arr.splice(-1);

console.log(arr); // Now the arr array no longer contains the spliced contents.

arr.splice(1, 2);
console.log(arr);


///// REVERSE METHOD /////

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // NOTE: It also mutates the original array.
console.log(arr2); // As you can see the original arr2 array is now also changed

///// CONCAT METHOD /////

const letters = arr.concat(arr2);
console.log(letters);

// Another method of concatinating :-

console.log([...arr, ...arr2]); // It wont mutate the original array but it will do the same thing done above thing while making a copy of it,

///// JOIN METHOD /////

console.log(letters.join('-'));


const arr6 = [23, 43, 21];
console.log(arr6[0]);
console.log(arr6.at(0));

////// Traditional way of taking out the last element of an array

console.log(arr6[arr6.length-1]); // We can't specify -1 directly here
console.log(arr6.slice(-1)[0]);

////// Modern way of taking out the last element of an array

console.log(arr6.at(-1)); // but here we can directly specify -1 


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
  for(const [i, movement] of movements.entries()){  
    if (movement > 0) {
      console.log(`Movement ${i+1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
    }
  };
  
  console.log('-------- FOR EACH Method ---------');
  
  ////// For Calculating The Current Balance ///////
  
  const currentBal = function (data) {
    let deposits = 0;
    let withdrawls = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) {
        deposits += data[i]
      } else if (data[i] < 0) {
        withdrawls += Math.abs(data[i])
      }
    }
    console.log(`Total Deposits ${deposits}`);
    console.log(`Total Withdrawls ${Math.abs(withdrawls)}`);
    
    return `Current Balance: ${deposits - withdrawls}`;
  };
  
  console.log(currentBal(movements));
  
  // The above function is made by me 😁
  
  
  
  ///// FOR EACH LOOP /////
  
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i+1}: You deposited ${mov}`);
    } else {
      console.log(`Movement ${i+1}: You withdrew ${Math.abs(mov)}`);
    }
  })
  
  // NOTE: In for each loops the first parameter is the value and the second parameter is the index where in the for of loop when using the entries method, it takes the first parameter as the index and second as the value
  
  //////// For Each On Maps ////////
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  currencies.forEach(function (val, key, arr) {
    console.log(`${key} refers to ${val}`);
  })
  
  //////// For Each On Sets  /////////
  
  
  const currencyUnique = new Set(['USD', 'INR', 'GBP', 'USD', 'INR', 'EUR', 'YEN', 'EUR']);
  
  currencyUnique.forEach(function (val) {
    console.log(val);
  })
  
////// MAP METHOD /////// 
  
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
  //   return mov * eurToUsd;
  // });
  
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  
  console.log(movements);
  console.log(movementsUSD);
  
  const movementsDescription = movements.map((mov, i) => 
  
  `Movement ${i+1}: You ${mov>0? 'deposited':'withdrew'} ${Math.abs(mov)}`
  
  )
  
  console.log(movementsDescription); // Stored the entire map to an array

  
  
  //// FILTER METHOD //////
  
  const deposits = movements.filter(function (mov) {
  return mov > 0;
})
console.log(movements);
console.log(deposits);  

// const withdrawls = movements.filter(function (mov) {
  //   return mov < 0;
  // });
  
  const withdrawls = movements.filter(mov => mov < 0);
  
  console.log(withdrawls);
  
  
  
  console.log(movements);

////// REDUCE METHOD ////////
  
  // Accumulator is Like a SNOWBALL, it takes multi statements and combine them in a single variable
  // const balance = movements.reduce(function (acc, cur, i, arr) {
    //   // acc -> Accumulator
    //   console.log(`Iteration No.${i}: ${acc}`);
    //   return acc + cur
    // },0);
    
    /// Performing the above operation using arrow function
    
    const balance = movements.reduce((acc, cur)=> acc + cur,0);
    
    console.log(balance);
    
    //// Other way of calculating balance using for loop
    
    let balance2 = 0;
    for (const mov of movements) balance2 += mov;
    console.log(balance2);
    
    //// Maximum Value
    
    // const max = movements.reduce((acc, mov) => {
      //   if (acc > mov)
      //     return acc;
      //   else
      //     return mov;
// }, movements[0]);

const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);

console.log(max);



//////// CHAINING METHODS /////////

const eurToUsd = 1.1;

const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov,0);
/// NOTE: The order of the chaining should be like this, Which basically means that keep in mind that both the filter and map methods returns an array but not the reduce method, the reduce method simply returns a number thats why we should use the reduce method at the last of the chaining method unless it might throw an error

console.log(totalDepositsUSD);



/////// The FIND Method ////////

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl); // The FIND method is similar to the filter method, the only difference is that unlike the filter method, the find method returns only the first element that satisfies/meets the conditions where the filter method returns every elements that meets the condition in a new array.



////////// SOME Method //////////

// EQUALITY
console.log(movements.includes(-130));

// CONDITIONS
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // This method is similar to the .includes method, only difference is in .some method you can specify the conditions which either meets with the elements or not.


//////// EVERY METHOD /////////

// It is quite similar to the some method but in every method it will only return true if all the elements meets the conditions

console.log(movements.every(mov=> mov>0));
console.log(account4.movements.every(mov=> mov>0));

// Separate Callbacks

const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


/////// FLAT Method /////////

const testArr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(testArr.flat());

const testArrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(testArrDeep.flat(2)); // selected the depth at level 2

// with only flat method
const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0)
console.log(overallBalance);

// with flatmap method

const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
console.log(overallBalance2);

// The flatmap method basically combines the  flat and map method


//// SORT Method ///////


//// With STRINGS
const owners = ['Sandeep', 'Maru', 'Jitu', 'Sanjay'];
console.log(owners.sort()); // Sorts the strings in the array alphabetically, and also it mutates the actual array.

///// With NUMBERS
console.log(movements);
// console.log(movements.sort());
// The result will not come as expected because the sort method is basically usefull for strings most of the time

// return < 0, A, B
// return > 0, B, A

// Sorted in Ascending Order

// movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  // });
  
  // Other Way
  
  movements.sort((a, b) => a - b);
  console.log(movements);
  
  /// Sorted in Descending Order

// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });


// Other Way
movements.sort((a, b) => b - a);
console.log(movements);

*/

// More ways of creating and filling arrays

// Traditional way:-
const tradArr = [1, 2, 3, 4, 'Maru', 'Jitu', true];

// Another Way
const arr2 = new Array(1, 2, 3, 4, 'Sizuka', 'Sasuke', 'Dattebayo', false);

///// FILL Method //////

const x = new Array(7); // It will return an empty array with the length of 7
console.log(x);
// x.fill(2); // It fills the empty array with the specific element described in the parameter

x.fill(1, 3, 5) // It will fill the array starting from index 3 and ends at index 5

console.log(x); 

// tradArr.fill(25, 2, 6);
// console.log(tradArr);

///// Array.from Method

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // _ this is known as throwaway variale which we use where we don't really need it to define but still required as a blank variable
console.log(z);

