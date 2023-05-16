'use strict';
/*
Let's continue with our football betting app! Keep using the 'game' variable from before.

Your tasks:
1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and log it to the console (We already 
studied how to calculate averages, you can go check if you don't remember)

3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them 
(except for "draw"). Hint: Note how the odds and the game objects have the 
same property names �

4. Bonus: Create an object called 'scorers' which contains the names of the 
players who scored as properties, and the number of goals as the value. In this 
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}
GOOD LUCK 
*/
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// #1

// Samjh nahi aya ki index kese le



// Self Test

const testObj = {
    names: ['Sandeep', 'Maru', 'Jitu', 'Sanjay'],
    days: {
        mon: 'Back Workout',
        tue: 'Chest Workout',
        wed: 'Biceps Workout',
        thu: 'Holiday',
        fri: 'Shoulder Workout',
        sat: 'Triceps Workout',
        sun: 'Leg Day'
        
    },
    
};
const testObj2 = {
    friend1: 'Jitu',
    friend2: 'Maru',
    habits: {
        friend1: 'Preparing for ITI',
        friend2: 'Preparing for SSC'
    },
};
for (const [index, values] of Object.entries(testObj2.habits)) {
    // console.log(`${testObj2[index]} is ${values}`);
}
//For ARRAYS stored under OBJECTS 
for (const [i, names] of testObj.names.entries()) {
    // console.log(`The Hero No.${i+1} is ${names}`);
    
};
// For OBJECTS Stored Under OBJECTS
const entries = Object.entries(testObj.days)
for (const [i, workouts] of entries) {
    // console.log(`On ${i}, I do ${workouts}`);
};
/////////////////////////////////////////////////////////////////////////////

// CODING CHALLENGE #2

for (const [i, player] of game.scored.entries()) {
    console.log(`Goal ${i+1} scored by ${player}`);
};

// Entries work in such a way like when we destructure them into the array it takes the index value and store it in the first variable and stores the items or values stored under those item in second variable

// #2
const oddsOuter = Object.values(game.odds);
let average = 0;
for (const oddsInner of oddsOuter) 
    average += oddsInner;
    average /= oddsOuter.length;
    console.log(average);
// Haven't quite understood this either

// console.log(`Odd of Victory${game.team1}: ${game.odds.team1}`);

const teamNames = [game.team1, game.team2];
let teamIndex = 0;
for (const [ index , value] of Object.entries(game.odds)) {
    const teamStr = index === 'x'? 'draw': `victory ${game[index]}`  //Speacially this part
    console.log(`Odd of ${teamStr}: ${value}`);
    // teamIndex = 0 ? teamIndex = 1 : teamIndex = 0;
} // This question got me a lot of trouble and using the same variable name

// The game[index] part. I was having troubles in getting the player names data from  game.team1 and game.team2 which got solved by game[index] as the game.odds also have the team1 and team2 variable

