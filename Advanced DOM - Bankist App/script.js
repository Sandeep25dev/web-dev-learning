'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


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

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' }) 
  // This funtion is deeply explained in the below lectures section
})

/////////////////////////////////////////////////////////////////////////////

// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // It will use as the Id selector throughout the loop 
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // In the querySelector the parameter is used as the id variable each time the loop is initiated

//   })
// }) //////// Study this code for better understanding /////////

// Using the Event Delegation and implementation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// Selection the common element or parent element of all the links, which in this case it nav__links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target); //remove comments for better understanding

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    // used the same code we made above
    const id = e.target.getAttribute('href');
    // console.log(id); //remove comments for better understanding
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

/// Building a tabbed component ///

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // IT will search for the closest parent element with the classname of .operations__tab in order to avoid selecting the span element in the button which will disrupt the function

  // Guard Clause
  if (!clicked) return;

  // console.log(clicked);

  // Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

//////////////////// READ THE CODE BELOW DEEPLY /////////////////////////////

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// })

// Another Method :- but for this you have to change the opacity variable to this keyword and also remove the opacity parameter from the function

nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
//  }); 

nav.addEventListener('mouseout', handleHover.bind(1));


//// Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

//// Sticky Navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold:0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

//// Lazy Loading Images ////

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img=>imgObserver.observe(img))

////// Slider ////////


/////////// REVISE THIS CODE ////////////


const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length - 1;

/// Functions

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
};

createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activateDot(0);
// slider.style.transform = 'scale(0.5)';
slider.style.overflow = 'hidden';

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}
goToSlide(0);
// Next slide

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
})

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // const slide = e.target.dataset.slide;
    const {slide} = e.target.dataset;
    goToSlide(slide); // It will go to the particular slide as defined and destrucutured above
    activateDot(slide);
  }
})

/////////////////////////////////////////////////////////////////////////////

// DOM Lectures


// Selecting Elements
// console.log(document.documentElement); // Select the entire webpage
// console.log(document.head); // Select the head of webpage
// console.log(document.body); // Select the body of webpage

// const header = document.querySelector('.header') // Select a single element with class 'header'
// const allSections = document.querySelectorAll('.section'); // select all elements with 'section' class
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

// console.log(logo.dataset.versionNumber); // Here you'll have to clarify the the dataset to access it

////// Classes //////
/*
logo.classList.add('c', 's'); // We can add multiple classes at once
logo.classList.remove('c', 's');
logo.classList.toggle('c', 's');
logo.classList.contains('c', 's');
*/
/*
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
*/

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

// console.log(randomColor());

/*
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


///// DOM Traversing /////////

const h1 = document.querySelector('h1');

//// Going Downwards: Selecting child elements /////
console.log(h1.querySelectorAll('.highlight'));
// Selecting the direct childs of the element :-
console.log(h1.childNodes); // The childNodes method is not that useful 
// Instead we can use.children method which will return us the HTML elements collection of it's child that are used in it's child scope

console.log(h1.children);

h1.firstElementChild.style.color = 'white'; // Only the first child element is gonna be modified

// And also we can do:-
h1.lastElementChild.style.color = 'purple';


///// Going Upwards: Selecting parent elements /////

// For selecting the direct parent
console.log(h1.parentNode);
console.log(h1.parentElement); // It might show the same output but actually it works differently

// Selecting the closest parent element
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Opposite to the querySelector where querySelector looks for the children no matter how far it is located in the dom tree, while in the .closest method it looks for thr parent elements... (both accepts queries as it's parameters)

///////// Going Sideways: Selecting siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Other way of getting all the siblings
console.log(h1.parentElement.children);

*/


