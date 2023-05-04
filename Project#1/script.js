'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
console.log(number);
let score = 20;
let highscore = 1;

//Functions-----
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
    document.querySelector('.score').textContent = score;
};


document.querySelector('.btn-check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess);
    if (!guess) {
        displayMessage('No Number!😕');
    } else if (guess !== number) {
        if (score > 1) {
            guess > number ? displayMessage('Too High!😬') : displayMessage('Too Low!🫠');
            score--;
            displayScore(score);
        } else {
            displayMessage('You Lost The Game! 🫡');
            displayScore(0);
            
        }
    }  else if (guess === number) {
        if (score > 1) {
            displayMessage("Woohoo... You're Correct! 🥳🎉");
            document.querySelector('.number').textContent = number;
            document.querySelector('body').style.backgroundColor = 'rgb(248, 174, 100)';
            document.querySelector('.number').style.width = '20rem';
            document.querySelector('.highscore').value = highscore;
            if (score > highscore) {
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }
            
        } 
        else {
            displayMessage(`You Lost The Game! 🫡`);
            displayScore(0);
            
        }
    }
        
    
})

 document.querySelector('.btn-again').addEventListener('click', function () {
    score = 20;
    number = Math.trunc(Math.random() * 20) + 1;
    console.log(number);
     displayMessage('Start guessing...');
    displayScore(score);
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#234c68'



 })














