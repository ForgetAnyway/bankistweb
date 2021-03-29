'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Button Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// const h1 = document.querySelector('h1');

// ////////////////////////////////////////////////////////////////////
// Page Navigation

const backToHead = document.querySelector('.nav__logo');
const header = document.querySelector('#header--1');
backToHead.addEventListener('click', function(e) {
    e.preventDefault();
    header.scrollIntoView({ behavior: 'smooth' });
});

// Event Delegation
document.querySelector('.nav__links').addEventListener('click', function(e) {
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

const h1 = document.querySelector('h1');

// Going downwards : child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);

// Only for direct children
console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'red';

// Going Upwards: Selecting parents

console.log(h1.parentNode);
console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going Sideways

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');
    if (clicked.classList.contains('operations__tab--active')) {
        clicked.classList.remove('operations__tab--active');
        tabsContent.forEach(t => t.classList.remove('operations__content--active'));
        document
            .querySelector(`.operations__content--${clicked.dataset.tab}`)
            .classList.add('operations__content--active');
    } else clicked.classList.add('operations__tab--active');

    tabsContent.forEach(t => t.classList.remove('operations__content--active'));
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

const navigation = document.querySelector(`.nav`);

navigation.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = 0.5;
            logo.style.opacity = 0.5;
        });
    }
});

navigation.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = 1;
            logo.style.opacity = 1;
        });
    }
});