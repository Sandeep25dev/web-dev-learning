'use strict';
const user = {
    name: 'Sandeep',
    email: 'sandeepofficial2509@gmail.com',
    age: 20,
};
// console.log('-----Keys-----');
// console.log(Object.keys(user));
// console.log('-----Values-----');
// console.log(Object.values(user));
// console.log('-----Entries-----');
// console.log(Object.entries(user));

// for (let keys of Object.keys(user)) {
//     console.log(keys);
// };
// for (const values of Object.values(user)) {
//     console.log(values);
// };
// for (const entries of Object.entries(user)) {
//     console.log(entries);
// };

// for (const [keys, values] of Object.entries(user)) {
//     console.log(`${keys}: ${values}`);
// };


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
  
 
  
// Quiz App
  
  console.log(question.get('question'));
  for (const [keys, values] of question) {
      if(typeof keys === 'number') console.log(`Answer ${keys}: ${values}`);
    };
  const answer = Number(prompt(question.get('question')));
  if (answer) {
    if (answer === question.get('correct')) {
      alert(question.get(true));
    } else {
      alert(question.get(false));
    }
  };
  console.log(answer);