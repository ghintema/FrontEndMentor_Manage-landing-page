// Getting elements
const slide = document.getElementsByClassName('all-slides')[0] // [0] to turn html-collection into single Element.
const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');
const pigeons = document.getElementById('pigeons')
let slides = document.getElementsByClassName('slide')

let intervalID;
let intervalTime = 5000;

// Making clones: First two and last two slides need be cloned.
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Giving Id's to the clones
firstClone.id = 'firstClone';
lastClone.id = 'lastClone';

// .prepend and .append need be called on the parent DOM-Element. 
slides[0].parentElement.prepend(lastClone);
slides[0].parentElement.append(firstClone);


let index = 1; // setting start-point to original first slide. 
const left = index * 100 - 2.5 ; //offset is necessary here if slide-content width is less than 100% e.g. to have a gap between the slides.
slide.style.left = `-${left}%`

// width adaption according to numer of slides
slide.style.width = `${slides.length}00%`
for (let i = 0; i < slides.length; i++) {
    slides[i].style.width = `${100/slides.length}%`
}

// FUNCTION DEFINITION

const positionTheSlider = (index) => {
    const left = index * 100 - 2.5 ;
    slide.style.left = `-${Math.abs(left)}%`
}

const pigeonHighlighting = (index) => {

    pigeons.children[0].style.backgroundColor = 'white';
    pigeons.children[1].style.backgroundColor = 'white';
    pigeons.children[2].style.backgroundColor = 'white';
    pigeons.children[3].style.backgroundColor = 'white';
    if (index === 5) {
        pigeons.children[0].style.backgroundColor = 'var(--clr-accent-400)'    
    } else if (index === 0) {
        console.log(slides.length)
        pigeons.children[slides.length - 3].style.backgroundColor = 'var(--clr-accent-400)'
    } else {
        pigeons.children[index - 1].style.backgroundColor = 'var(--clr-accent-400)'
    }
}

const setAriaHidden = (index) => {

    // set all slides to hidden='true'
    for (let i = 0; i < slides.length; i++) {
        slides[i].setAttribute('aria-hidden',true);
    }

    // set only the currently visible slide to hidden='false' 
    if (index === 5) {
        slides[1].setAttribute('aria-hidden',false);    
    } else if (index === 0) {
        slides[slides.length - 2].setAttribute('aria-hidden',false);
    } else {
        slides[index].setAttribute('aria-hidden',false);
    }
}    

const moveOn = (step) => { 
    
    if (index >= slides.length - 1) {return} // prevents fast overclicking beyond last slide
    if (index < 1 ) {return} // prevents fast underclicking below first slide
    
    index = index + step;
    slide.style.transition = '0.6s ease';

    positionTheSlider(index)
    pigeonHighlighting(index);
    setAriaHidden(index);
}



const goTo = (target) => {
    index = target;
    slide.style.transition = '0.6s ease';
    pigeonHighlighting(index);
    setAriaHidden(index);
    positionTheSlider(index)
    stopAutoPlay();
}

function reset() {
    if (slides[index].id === 'firstClone') {
        index = 1;
        slide.style.transition = 'none';
        positionTheSlider(index)
    }

    if (slides[index].id === 'lastClone') {
        index = slides.length - 2;
        slide.style.transition = 'none';
        positionTheSlider(index)
    }
    console.log(index)
}

const startAutoPlay = () => {
    intervalID = setInterval(() => {
    moveOn(1)
    },intervalTime)
}

const stopAutoPlay = () => {
    clearInterval(intervalID);
}



// FUNCTION INVOCING
// startAutoPlay();
buttonNext.addEventListener('click',() => {moveOn(1)});
buttonPrev.addEventListener('click',() => {moveOn(-1)});

// Resetting the slide at the end or beginning for emulating the loop.
slide.addEventListener('transitionend', reset);
slide.addEventListener('transitionend', pigeonHighlighting(index));
buttonNext.addEventListener('mouseenter', stopAutoPlay);
buttonPrev.addEventListener('mouseenter', stopAutoPlay);
slide.addEventListener('mouseenter', stopAutoPlay);
// slide.addEventListener('mouseenter', () => {console.log('test')} )
pigeons.addEventListener('mouseenter', stopAutoPlay);
// pigeons.addEventListener('mouseleave', startAutoPlay);
// slide.addEventListener('mouseleave', startAutoPlay);


slide.addEventListener('swiped-left', () => {moveOn(1)});
slide.addEventListener('swiped-right', () => {moveOn(-1)});



// IMPLEMENTING SWIPE GESTURES

// Source and explanation on: 
// https://www.kirupa.com/html5/detecting_touch_swipe_gestures.htm

document.getElementById('all-slides').addEventListener("touchstart", startTouch, false);
document.getElementById('all-slides').addEventListener("touchmove", moveTouch, false);
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
    //   console.log("swiped left");
      moveOn(1)
    } else {
      // swiped right
      console.log("swiped right");
      moveOn(-1)
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
    } else {
      // swiped down
      console.log("swiped down");
    }  
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
};




// var touchstartX = 0;
// var touchstartY = 0;
// var touchendX = 0;
// var touchendY = 0;

// var gesuredZone = document.getElementById('touch');

// console.log(gesuredZone)
// gesuredZone.addEventListener('touchstart', function(event) {
//     touchstartX = event.touches[0].clientX;
//     touchstartY = event.touches[0].clientY;
//     console.log(event)

// }, false);

// gesuredZone.addEventListener('touchend', function(event) {
//     console.log(event)
//     touchendX = event.touches[0].clientX;
//     touchendY = event.touches[0].clientY;
//     handleGesure();
// }, false); 

// function handleGesure() {
//     console.log(touchstartX)
//     console.log(touchendX)
//     var swiped = 'swiped: ';
//     if (touchendX < touchstartX) {
//         alert(swiped + 'left!');
//     }
//     if (touchendX > touchstartX) {
//         alert(swiped + 'right!');
//     }
//     if (touchendY < touchstartY) {
//         alert(swiped + 'down!');
//     }
//     if (touchendY > touchstartY) {
//         alert(swiped + 'left!');
//     }
//     if (touchendY == touchstartY) {
//         alert('tap!');
//     }
// }

