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
    const darkFilter = document.getElementById('darkFilter')

    // to open/close menu
    menuIcon.addEventListener('click', (event) => {
        menuIcon.classList.toggle('change')
        toggleSmallScreenMenu()

        if (menuIcon.className === 'menuItem change') {
            event.stopPropagation()
        }
    })

    // to close menu
    darkFilter.addEventListener('click', () => {
        if (menuIcon.className === 'menuItem change') {
            menuIcon.classList.toggle('change')

            toggleSmallScreenMenu()
        }
    })
}

/**
 * Opens menu and displays links
 * @param menuLinks nodelist with link elements for menu
 */
function toggleSmallScreenMenu() {
    const smallMenuBar =
        document.getElementById('smallMenu')
    const navLinks = document.getElementById('navLinks')
    const darkMenu = document.getElementById('darkFilter')

    smallMenuBar.classList.toggle('openMenu')
    navLinks.classList.toggle('openMenu')
    darkMenu.classList.toggle('openMenu')
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
