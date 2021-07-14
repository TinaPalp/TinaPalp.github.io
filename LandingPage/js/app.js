/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
 * 
*/

const navBarList = document.getElementById("navbar__list");
const section = document.getElementsByTagName("section");
const headlines = document.getElementsByTagName("h2");



// creating nav-bar 
for(var i=0; i<section.length; i++) {
    let liNav = document.createElement('li');

    if(i==0){
        liNav.classList.add('activeNavItem');
    }

    let aNav = document.createElement('a');
    aNav.setAttribute('href','#'+section[i].id );
    let headlineNav = document.createTextNode(headlines[i].innerText);
    aNav.classList.add('menu__link');
    aNav.appendChild(headlineNav);
    navBarList.appendChild(liNav);
    liNav.appendChild(aNav);


}


// functions for determing which section is in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >=  -140 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth 
    );
}

function whichSection() {
    let sectionViewport = 10;
    for(var i=0; i<section.length; i++) {
        if(isInViewport(section[i])) {
            sectionViewport = i;
        } 
    }
    return(sectionViewport);
}


//deleting active class if not in virwport
const activeNav = document.getElementsByClassName('activeNavItem');
const activeNavList = document.getElementsByTagName('li');

function removeActiveClass() {
    sectionViewport= whichSection();
    if (sectionViewport!= 0) {
        section[0].classList.remove('your-active-class');
        activeNavList[0].classList.remove('activeNavItem');

    }  
}

//highlighting corresponding NavItem and section
function highlightSectionAndNav(){
   

    sectionInView = whichSection();
    const activeSection = document.getElementsByClassName('your-active-class');

    if (sectionInView !=10) {
        section[sectionInView].classList.add('your-active-class');
        activeNavList[sectionInView].classList.add('activeNavItem');
        for(var i=0; i<activeSection.length; i++) {
            if (activeSection[i].id != section[sectionInView].id) {
                activeSection[i].classList.remove('your-active-class');
                activeNav[i].classList.remove('activeNavItem');

            }
        } 
    }

}


function viewportSection() {
    highlightSectionAndNav();
 
}



removeActiveClass();
document.addEventListener('scroll', viewportSection);

