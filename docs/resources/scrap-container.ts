import { scrap, $ } from "scrapq";

scrap(html, {
    title: $.text('h1.title'),
    items: $.list('li', {
        text: $.text('span'),
    }),
    readMore: $.text('a'),
    footer: $.text('div.footer')
});
