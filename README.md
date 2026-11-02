# Joshua Avoaja — portfolio

My personal site: projects and case studies, a pinboard of things I like, and
a way to get in touch. Live at <https://joshuaavoaja.netlify.app/>.

Built with React 17, React Router and Vite. The current design lives in
`src/v2/` and serves the bare paths (`/`, `/projects`, `/pinboard`, `/about`,
`/contact`). The previous design is kept under `/v1`.

## Running it

```sh
npm install
npm run dev       # dev server
npm test          # Vitest
npm run build     # production build into build/
npm run preview   # serve the build locally
```

## Where things are

| What | Where |
| --- | --- |
| Projects and case studies | `src/data/projects.json`, images in `public/project-images/` |
| Pinboard pins | `src/v2/data/pins.js`, images in `public/pin-images/` |
| Career history | `src/v2/data/experience.js` |
| Design system | `src/v2/v2.css` |
| Bench architecture diagrams | `docs/diagrams/` |
| Share card and site icons (sources) | `docs/og/`, `docs/icons/` |

`src/v2/README.md` has the details of the v2 design, its routes and open items.

## Deploying

Netlify builds with `npm run build` and publishes `build/`.
`public/_redirects` sends every path to `index.html` so client-side routes
work on refresh. The contact form posts to Netlify Forms.
