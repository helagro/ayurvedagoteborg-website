'use strict'
;(() => {
  setHTMLLanguage()
  isSwedishLanguage() && translate()

  const width = getScreenWidth()
  
  if (width < 1200) {
    const menuLinks = getMenuLinks()
    appendSmallScreenMenu()
    makeMenuIconResponsive(menuLinks)
    removeBigLogo()
    removeBigMenu()
  }
  if (width < 1024) {
    if (calendarExists()) {
      redesignCalendar()
    }
  }
})()

function setHTMLLanguage() {
  document.documentElement.lang = navigator.language
}

function isSwedishLanguage() {
  const language = (
    navigator.language || navigator.userLanguage
  ).substring(0, 2)

  return language === 'sv'
}

function translate(){
  const swedishElements = document.getElementsByClassName(
    'swedish'
  )
  toggleAllDisplayNone(swedishElements)

  const englishElements = document.getElementsByClassName(
    'english'
  )
  toggleAllDisplayNone(englishElements)
}
window.translate = translate

/**
 * @param {HTMLCollectionOf<Element>} elements
 */
function toggleAllDisplayNone(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('displayNone')
  }
}

function getScreenWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  )
}

/**
 * @returns nodelist with link elements for menu
 */
function getMenuLinks() {
  return document.querySelectorAll('.menuItem')
}

function appendSmallScreenMenu() {
  const smallMenu = document.createElement('div')
  smallMenu.innerHTML = `
        <a href="index.html">
          <img id="logoType" src="img/website/Logga.png" alt="Logotyp">
        </a>
        <div class="menuItem" id="menuIcon">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    `
  smallMenu.classList.add('smallMenu')

  const main = document.getElementById('main')
  main.insertBefore(smallMenu, main.firstChild)
}

function removeBigLogo() {
  const headerDiv = document.getElementById('headerDiv')
  headerDiv.removeChild(headerDiv.firstElementChild)
}

function removeBigMenu() {
  const mainSection = document.getElementById('mainSection')
  mainSection.removeChild(mainSection.firstElementChild)
}

/**
 * Makes it so the small screen menu opens and closes
 * on click
 * @param menuLinks nodelist with link elements for menu
 */
function makeMenuIconResponsive(menuLinks) {
  const menuIcon = document.getElementById('menuIcon')
  const main = document.getElementById('main')

  // to open/close menu
  menuIcon.addEventListener('click', (event) => {
    menuIcon.classList.toggle('change')

    if (menuIcon.className === 'menuItem change') {
      openSmallScreenMenu(menuLinks)
      addFilter()

      // stops event from bubbling up to parent nodes
      event.stopPropagation()
    } else {
      closeSmallScreenMenu()
      removeFilter()
    }
  })

  // to close menu
  main.addEventListener('click', () => {
    if (menuIcon.className === 'menuItem change') {
      menuIcon.classList.toggle('change')

      closeSmallScreenMenu()
      removeFilter()
    }
  })
}

/**
 * Opens menu and displays links
 * @param menuLinks nodelist with link elements for menu
 */
function openSmallScreenMenu(menuLinks) {
  const openMenu = document.createElement('div')
  openMenu.classList.add('openMenu')

  menuLinks.forEach((menuLink) => {
    const pLink = document.createElement('p')
    pLink.classList.add('menuLink')
    pLink.appendChild(menuLink)
    openMenu.appendChild(pLink)
  })

  const menuIcon = document.getElementById('menuIcon')
  menuIcon.appendChild(openMenu)
}

//adds a transparent, dark div over the content
function addFilter() {
  document.querySelector('.smallMenu').style.borderBottom =
    '0px'
  document.getElementById('menuIcon').style.marginRight =
    '0px'

  let filter = document.createElement('div')
  filter.id = 'darkFilter'
  document.getElementById('mainSection').appendChild(filter)
}

//removes it
function removeFilter() {
  document.querySelector('.smallMenu').style.borderBottom =
    '2px solid gray'
  document.getElementById('menuIcon').style.marginRight =
    '10%'
  document
    .getElementById('mainSection')
    .removeChild(document.getElementById('darkFilter'))
}

function closeSmallScreenMenu() {
  const menuIcon = document.getElementById('menuIcon')
  menuIcon.removeChild(menuIcon.lastChild)
}

function calendarExists() {
  return document.getElementById('calendar')
}

function redesignCalendar() {
  const calendarBody = document.getElementById('calendar')
    .firstElementChild

  const body = document.getElementsByTagName('body')[0]

  const tableHeadings = calendarBody.children[0].children

  const style = document.createElement('STYLE')

  style.innerHTML = getStringifiedSmallScreenTableStyle()

  // adds labels for the table data, see https://css-tricks.com/responsive-data-tables/
  for (let i = 0; i < tableHeadings.length; i++) {
    style.innerHTML += `
      td:nth-of-type(${i + 1}):before { content: "${
      tableHeadings[i].innerHTML
    }: "; }
    `
  }

  body.appendChild(style)
}

// style for small screens, inspired by:
// https://css-tricks.com/responsive-data-tables/
function getStringifiedSmallScreenTableStyle() {
  return `
    @media only screen and (max-width: 1024px)  {
    
      /* Force table to not be like tables anymore */
      table, thead, tbody, th, td, tr { 
        display: block; 
      }
      
      /* Hide table headers (but not display: none;, for accessibility) */
      th { 
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
      
      tr { border: 1px solid #ccc; }
      
      td { 
        /* Behave  like a "row" */
        border: none;
        border-bottom: 1px solid #eee; 
        position: relative;
        padding-left: 40%; 
        word-wrap: break-word;
      }
      
      td:before { 
        /* Now like a table header */
        position: absolute;
        /* Top/left values mimic padding */
        top: 6px;
        left: 6px;
        width: 45%; 
        padding-right: 10px; 
        white-space: nowrap;
      }
    }
  `
}
