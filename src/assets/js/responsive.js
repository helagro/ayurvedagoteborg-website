'use strict'
;(() => {
    const width = getScreenWidth()

    makeMenuIconResponsive()

    if (width < 1024) {
        if (calendarExists()) redesignCalendar()
    }
})()

function isSwedishLanguage() {
    const language = (
        navigator.language || navigator.userLanguage
    ).substring(0, 2)

    return language === 'sv'
}

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
 * Makes it so the small screen menu opens and closes
 * on click
 * @param menuLinks nodelist with link elements for menu
 */
function makeMenuIconResponsive() {
    const menuIcon = document.getElementById('menuIcon')
    const main = document.getElementById('main')

    // to open/close menu
    menuIcon.addEventListener('click', (event) => {
        menuIcon.classList.toggle('change')
        toggleSmallScreenMenu()

        if (menuIcon.className === 'menuItem change') {
            addFilter()

            // stops event from bubbling up to parent nodes
            event.stopPropagation()
        } else {
            removeFilter()
        }
    })

    // to close menu
    main.addEventListener('click', () => {
        if (menuIcon.className === 'menuItem change') {
            menuIcon.classList.toggle('change')

            toggleSmallScreenMenu()
            removeFilter()
        }
    })
}

/**
 * Opens menu and displays links
 * @param menuLinks nodelist with link elements for menu
 */
function toggleSmallScreenMenu() {
    const navBar = document.getElementById('menu')
    navBar.classList.toggle('openMenu')
}

//adds a transparent, dark div over the content
function addFilter() {
    document.querySelector(
        '.smallMenu'
    ).style.borderBottom = '0px'
    document.getElementById('menuIcon').style.marginRight =
        '0px'

    let filter = document.createElement('div')
    filter.id = 'darkFilter'
    document
        .getElementById('mainSection')
        .appendChild(filter)
}

//removes it
function removeFilter() {
    document.querySelector(
        '.smallMenu'
    ).style.borderBottom = '2px solid gray'
    document.getElementById('menuIcon').style.marginRight =
        '10%'
    document
        .getElementById('mainSection')
        .removeChild(document.getElementById('darkFilter'))
}

/* ------------------------ CALENDAR ------------------------ */

function calendarExists() {
    return document.getElementById('calendar')
}

function redesignCalendar() {
    const calendarBody =
        document.getElementById(
            'calendar'
        ).firstElementChild

    const body = document.getElementsByTagName('body')[0]

    const tableHeadings = calendarBody.children[0].children

    const style = document.createElement('STYLE')

    style.innerHTML = ''

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
