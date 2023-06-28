'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal); /// Imrovisedbove traditional loop with forEach loop

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/////////////////////////////////////////////////////////////////////////////
/*
*/
// DOM Lectures

console.log(document.documentElement); // Select the entire webpage
console.log(document.head); // Select the head of webpage
console.log(document.body); // Select the body of webpage

document.querySelector('.header') // Select a single element with class 'header'
const allSections = document.querySelectorAll('.section'); // select all elements with 'section' class
console.log(allSections);

document.getElementById('section--1') // Select element by Id where you won't have to define the class or Id selector

const allButtons = document.getElementsByTagName('button'); // Select all elements of the specific tag name (in this case it's 'button')

document.getElementsByClassName('btn'); // Similar to getElementsById where you didn't had to specify the Id selector, similarly you won't have to specify the class selector here as well

