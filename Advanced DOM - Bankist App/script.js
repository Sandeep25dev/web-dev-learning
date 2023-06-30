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

/// Consider using addEventListner cause it's modern and has more funtionality, for example use can attach multi event listeners to a single one in the addEventListener method

