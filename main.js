const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.getElementById('mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');



// navToggle.addEventListener('click', () => {
//     console.log('test')
//     primaryNav.classList.toggle('opened')
// })


var x = window.matchMedia("(min-width: 47em)")

const initAriaHidden = () => {
    if (x.matches) { // If media query matches
        primaryNav.setAttribute('aria-hidden', 'false');
        console.log('test123')
      } else {
        primaryNav.setAttribute('aria-hidden', 'true');
        console.log('test 456')
      }
}

initAriaHidden();
x.addEventListener('change', initAriaHidden)

console.log(primaryHeader);
navToggle.addEventListener('click', () => {

    primaryNav.toggleAttribute('data-visible'); // alternative to .classList.toggle()
    primaryHeader.toggleAttribute('data-overlay'); 
    if(primaryNav.hasAttribute('data-visible')) {
        navToggle.setAttribute('aria-expanded', true);
        primaryNav.setAttribute('aria-hidden', false);
      
    } else {
        navToggle.setAttribute('aria-expanded', false);
        primaryNav.setAttribute('aria-hidden', true);
    
    }

})