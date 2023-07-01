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

// DOM Lectures


// Selecting Elements
// console.log(document.documentElement); // Select the entire webpage
// console.log(document.head); // Select the head of webpage
// console.log(document.body); // Select the body of webpage

const header = document.querySelector('.header') // Select a single element with class 'header'
const allSections = document.querySelectorAll('.section'); // select all elements with 'section' class
// console.log(allSections);

document.getElementById('section--1') // Select element by Id where you won't have to define the class or Id selector

const allButtons = document.getElementsByTagName('button'); // Select all elements of the specific tag name (in this case it's 'button')

document.getElementsByClassName('btn'); // Similar to getElementsById where you didn't had to specify the Id selector, similarly you won't have to specify the class selector here as well


// Creating and Inserting Elements

// .insertAdjacentHTML //use for modifying elements

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies to improve functionality and analytics.';
message.innerHTML = 'We use cookies for improved funtionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';


// header.prepend(message); // The prepend actually make the element as it's first child
header.append(message); // Append works quite the opposite of the prepend meanas append makes the selected element as it's last child

// NOTE: If we assign both prepend and append of a same elements in the DOM then the last written code will be executed (As in the above scenario it's the append method which was initiated last So the append msg will be executed and the prepend method will be ignored)

// But what if we want to make copies of the same element... Well in that case we can do this

// header.append(message.cloneNode(true)); // Now you'll get the same cookie msg at the both place


// header.before(message);
// header.after(message);
// As the name says "It will insert the element before or after the header as a sibling"



/////// Delete Elements ////////

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
  // Traditional Method
  // message.parentElement.removeChild(message);
})

////////////////////////////////////////////////////////////////////////////

// Styles, Attributes and Classes

//// Styles ////

message.style.backgroundColor = '#37383d';
message.style.width = '106%'
// message.style.padding = '10px 0px'

// console.log(message.style.color); // Here you'll get nothing because this element is applied manually in DOM as in the form of inline style...So you can't read it's property from the console
// console.log(message.style.backgroundColor); // You may read this elements property as it was already previously defined in the code

/// But if you want still to read the properties you can do this

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

//// Setting and Configuring properties(variables) of CSS 

// document.documentElement.style.setProperty('--color-primary', 'orangered');


////// Attributes ////////

// Accessing the Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); 
// console.log(logo.className); // not all atributes are called same as defined in the HTMl like the one where in HTML where you have to specify the class by writing only the class name but here you would have to Specify it as the className

// We can also change the value of the attributes by selecting those attributes same way as we did above
// logo.alt = 'Beautiful minimalist logo'

// NOTE: Non-standard attributes won't work in the DOM the same way as we did above...

// console.log(logo.designer);
//  instead we can do this
// console.log(logo.getAttribute('designer'));
// Similar to getAttribute we also have a setAttribute method as well
// logo.setAttribute('company','ShaKuSo Corp.')
// console.log(logo.getAttribute('company'));

// console.log(logo.src); // Through this method you'll get the absolute URL of the Image

// But if you want the relative URL then you can do this

// console.log(logo.getAttribute('src'));

// Same thing happens with the href link attributes as well

const link = document.querySelector('.twitter-link')
// console.log(link.href);
// console.log(link.getAttribute('href'));
// in this case both will display the absolute links, as in the html it's also defined as the absolute link

// But it will show differently in the nav links which are as of now defined as hash(#) only

const link2 = document.querySelector('.nav__link--btn')
// console.log(link2.href);
// console.log(link2.getAttribute('href')); // Here you'll see the relative URL same as defined in the HTML

////// Data Attributes

console.log(logo.dataset.versionNumber); // Here you'll have to clarify the the dataset to access it

////// Classes //////
/*
logo.classList.add('c', 's'); // We can add multiple classes at once
logo.classList.remove('c', 's');
logo.classList.toggle('c', 's');
logo.classList.contains('c', 's');
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset); // To see the scrolling position
  
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  
  ////// Old School Method ////////

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior:'smooth'
  // })

  // Read the code above and try to understand the function properly

  ////// New Method //////

  section1.scrollIntoView({behavior:'smooth'}) //// Consider This Method


})

/////////////////////////////////////////////////////////////////////////////

// Types of Events and Event Handlers
/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D")

  // Now if you want to remove the eventListener from the function after it got executed for once
  h1.removeEventListener('mouseenter',alertH1)

};

h1.addEventListener('mouseenter', alertH1 )

// Another way of removing the event listener using timeOut :-

setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000)


// Doing the same thing done above using a different method

// h1.onmouseenter = function (e) {
  // alert("onmouseenter: Great! You are reading the heading :D")
// };
*/
/// Consider using addEventListner cause it's modern and has more funtionality, for example use can attach multi event listeners to a single one in the addEventListener method

// rgb(255,255,255)

////////// RANDOM COLOR GENERATOR FUNCTION  :- Can be used later in other places/////////

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // Generating a random number function. NOTE: Deep Study this function

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());


document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // .target will show that where the event was originated
  console.log(e.currentTarget === this); // The currentTarget keyword/method works same as the this keyword or we can say that the currentTarget method operates the same way as the this keyword because both are attached with the current element as selected.

 // If we want to stop the propagation, means that if we don't want to procees the propagation further to it's parent scopes/elements then in that case we can do this :-
  
  // e.stopPropagation(); // Using this method will stop the propagation immidietely, and it won't process any further to it's parent scopes or elemenets

  // NOTE: It's not a good idea neither a good practice to stop the propagation except on the necessary places 
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
})

// By default it only shows the bubbling phase and not the capturing phase.
// and we want to execute the capturing event as well we have to assign a third parameter to the event listener
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}, false) // Setting the capturing as true, it will display the this event on first, meaning this event will get executed first. By default it is set to false and I've also set it up to false to avoid the capturing event

// NOTE: Most of the time the capturing event don't get used... So it's irrelavent to use go further in the capturing phase. That's why we should not consider using it



