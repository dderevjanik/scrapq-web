const result = scrapq.scrap(html, {
    title: Q.text('h1.title'),
    items: Q.List('li', {
        text: Q.text('span'),
    }),
    readMore: Q.text('a'),
    footer: Q.text('div.footer')
})
