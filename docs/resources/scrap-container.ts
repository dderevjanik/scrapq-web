scrapq.scrap(html, {
    title: scrapq.text('h1.title'),
    items: scrapq.List('li', {
        text: scrapq.text('span'),
    }),
    readMore: scrapq.text('a'),
    footer: scrapq.text('div.footer')
});
