const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.getElementById('mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');



// navToggle.addEventListener('click', () => {
//     console.log('test')
//     primaryNav.classList.toggle('opened')
// })

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