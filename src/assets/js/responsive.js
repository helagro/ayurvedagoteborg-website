'use strict'
;(() => {
    if (
        isAutoTranslationEnabled() &&
        isEnglishBrowser() &&
        isOnSwedishPage()
    ) {
        const urlToEnglishVersion = getEnglishVersion()

        if (urlToEnglishVersion) {
            window.location.href = urlToEnglishVersion
        }
    }

    if (getScreenWidth() < 1024 && calendarExists())
        redesignCalendar()
})()

/* ----------------------- TRANSLATION ---------------------- */

function isAutoTranslationEnabled() {
    return (
        localStorage.getItem('disableTranslate') !== 'true'
    )
}

function isEnglishBrowser() {
    const language = (
        navigator.language || navigator.userLanguage
    ).substring(0, 2)

    return language === 'en'
}

function isOnSwedishPage() {
    return document.documentElement.lang === 'sv'
}

function getEnglishVersion() {
    const translateLink =
        document.getElementById('translateLink')

    return translateLink?.href
}

function disableAutoTranslation() {
    localStorage.setItem('disableTranslate', true)
}

/* --------------------- RESPONSIVENESS --------------------- */

function getScreenWidth() {
    return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    )
}

function toggleSmallScreenMenu() {
    const smallMenuBar =
        document.getElementById('smallMenu')
    const navLinks = document.getElementById('navLinks')
    const darkMenu = document.getElementById('darkFilter')
    const menuIcon = document.getElementById('menuIcon')

    smallMenuBar.classList.toggle('openMenu')
    navLinks.classList.toggle('openMenu')
    darkMenu.classList.toggle('openMenu')
    menuIcon.classList.toggle('openMenu')
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

    document.body.appendChild(style)
}
