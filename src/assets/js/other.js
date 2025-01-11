const rootStyles = getComputedStyle(document.documentElement)
const currentLinkColor = rootStyles.getPropertyValue('--current-link-color').trim()

let currentPage = location.href
if (location.pathname === '/') {
    currentPage += 'index.html'
}

console.log(location.pathname)
console.log('Page:' + currentPage)

for (const link of document.getElementsByTagName('a')) {
    if (link.href === currentPage) {
        link.style.color = currentLinkColor
        console.log(link.href)
    }
}
