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
})()

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
