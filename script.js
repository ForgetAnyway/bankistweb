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

const navHeight = navigation.getBoundingClientRect().height;

const headerCallback = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        navigation.classList.add('sticky');
    } else navigation.classList.remove('sticky');
};
const headerOptions = {
    root: null,
    threshhold: 0,
    rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(headerCallback, headerOptions);
headerObserver.observe(header);

// Revel sections

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy loading Images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-300px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider

let currentSlide = 0;
const activeDot = function(slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const maxSlide = slides.length;

slider.style.overflow = 'visible';
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const goToSlide = function(slide) {
    slides.forEach(function(s, i) {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activeDot(slide);
};

const nextSlide = function() {
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else currentSlide++;
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
    );
    activeDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

const previousSlide = function() {
    if (currentSlide === 0) {
        currentSlide = 2;
    } else currentSlide--;
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
    );
    activeDot(currentSlide);
};

btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

const dotContainer = document.querySelector('.dots');
const createDots = function() {
    slides.forEach(function(s, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"</button>`
        );
    });
};

createDots();
activeDot(0);
dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activeDot(slide);
    }
});

document.addEventListener('DOMContentLoaded', function(e) {
    console.log(e);
});