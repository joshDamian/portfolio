# Share card

`card.html` is the source of `public/og.jpg`, the 1200×630 image shown when a
link to the site is shared (`og:image` / `twitter:image` in `index.html`).

To rebuild: open `card.html` in a browser with a 1200×630 viewport, take a
screenshot, and save it as `public/og.jpg` (JPEG, quality ~86; it comes out
around 60 KB). The photo is `src/images/josh.jpg`, the same one the hero uses.

If the photo, name or one-line description changes, update this card too, and
keep the text in step with the `description` meta tags in `index.html`.
