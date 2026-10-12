# v2

The portfolio's redesign, and now **the site**: v2 owns the bare paths and v1 is
reachable under a version prefix so the two can still be compared.

## Routes

| canonical (v2) | previous (v1) |
| --- | --- |
| `/` | `/v1` |
| `/projects` | `/v1/projects` |
| `/projects/:id` | `/v1/projects/:id` |
| `/about` | `/v1/about` |
| `/contact` | `/v1/contact` |

`/v1` is linked once, quietly, from the footer ("Previous version"). There is no
version banner — on the real site it would announce a version to visitors.

## Files

```
config.js              V2_BASE + v2Routes — the single routing switch
v2.css                 the whole design system, every rule scoped under .v2-root
V2Layout.jsx           sticky top nav, footer, <Outlet/>
lib/format.js          asset/year/caption/gallery-span helpers
data/imageSizes.js     measured intrinsic dimensions for every shipped image
data/experience.js     the six roles from v1's About page, as plain data
components/            Reveal, ProjectCard, Lightbox, Icon
pages/                 Home, Projects, ProjectDetail, About, Contact
__tests__/v2.test.jsx  24 tests: routing, prefixing, filtering, gallery, a11y
```

Three files outside this folder:

- `src/App.jsx` — the route table: v1 under `/v1`, v2 at `/`.
- `src/constants/paths.js` — `V1_BASE` and `v1Path()`. v1's internal links go
  through it; deleting that file plus the `/v1` branch and footer link is what
  retiring v1 amounts to.
- `src/utils/contact.js` — `submitContact()` and `mailtoHref()`, shared by v1
  and v2 (see the contact section below). `lib/format.js` re-exports
  `mailtoHref` from here.

## Moving v1 under the prefix

Six link sites in v1 needed the prefix, and one probe did too:

| File | Change |
| --- | --- |
| `src/Layout.js` | 4 nav links → `v1Path(...)`; the "am I on the home page" test now asks about `/v1`, not `/` |
| `src/pages/Home.jsx` | the "More About Me" link |
| `src/pages/ProjectDetail.jsx` | the "Other Projects" link |
| `src/pages/Projects.jsx` | internal case-study hrefs — the target comes from `projects.json`'s `url`, which stays unprefixed, so the prefix is applied at the link site |
| `src/components/CustomLink.jsx` | its nested-route fallback compared against `"/"`; it now compares against `V1_BASE`, and matches `to + "/"` so `/v1/projects` stops prefix-matching `/v1/projects-archive` |

Everything else in v1 is byte-identical. External links and `mailto:` were not
touched.

## The routing switch

`config.js` exports `V2_BASE = ""`. `App.jsx` mounts the v2 branch at `V2_BASE ||
"/"`, and every v2 link derives from `v2Routes`, so nothing hardcodes a path.

**To put v1 back in front:** set `V2_BASE = "/v2"` and `V1_BASE = ""`.

**To retire v1:** delete the v1 branch in `App.jsx`, delete
`src/constants/paths.js`, drop the footer link, and fold v2 into the app — remove
the `.v2-root` scope from `v2.css`, move its tokens to `:root`, merge into
`index.css`, and `rm -rf src/v2`.

## What v2 changes, and why

Carried over: the dark editorial mood, content-first pacing, the timeline
gutter, skyblue as the only accent, data-driven projects.

Rebuilt: the sidebar rail became a sticky top nav; the four-breakpoint `md:`/`lg:`/
`xl:` ladders became one fluid `clamp()` scale; Poppins was replaced by Fraunces
(display) + Inter (UI); the gradient that sat on every surface is now one fixed
wash; cards and the case-study gallery were re-cut.

### Defects fixed

| v1 | v2 |
| --- | --- |
| Body copy `#515152` on black — **2.65:1**, fails AA | `--text-3 #8b9298` — **6.32:1** |
| About timeline: white icon on `bg-portfolio-skyblue` — **1.74:1** | dark ink on skyblue — **9.65:1** |
| Cards set no `width`/`height`; every image reflows as it decodes | measured intrinsic size on every image, plus `loading="lazy"` |
| Internal project links are bare `<a href>`, so a route change reloads the app | router `Link`; external links get `target="_blank"` and a spoken "opens in a new tab" |
| `rel="prev"` on internal links, which means nothing | dropped |
| Gallery images cropped into a uniform box, cutting off UI | figures keep their aspect ratio; `_full` captures span the width, height-capped |
| AOS animates regardless of `prefers-reduced-motion`; `AOS.init()` at module scope | `IntersectionObserver` per element, unobserved once shown, disabled entirely for reduced motion |
| No skip link, no visible focus ring beyond the UA default | skip link, `:focus-visible` ring, `aria-current="page"` |
| Contact fields are placeholder-only; `<h4>` nested inside `<p>` | real `<label for>` on every field; valid markup |
| `projects.json` mixes `"./project-images/…"` and `"/project-images/…"` | normalised in `asset()` |
| "Led the development of the Blocverse education platform. **now,**" | "…platform." — a content edit, so **please confirm** |

Four more that only bit the prototype, fixed here:

- `.yeargroup { display: grid }` outranks the UA sheet's `[hidden] { display: none }`,
  so the year filter set the attribute and nothing hid. v2 adds an explicit
  `.yeargroup[hidden] { display: none }`, and a test guards it.
- The prototype put `overflow-x: hidden` on `<body>`, where it propagates to the
  viewport. Scoped to a div it makes that div the scroll container, which breaks
  every sticky descendant — the nav and the year rail. v2 uses `overflow-x: clip`.
- JSX only decodes the five XML entities, so `&rarr;`, `&nearr;` and `&rsquo;`
  were rendering literally. Replaced with real characters.
- `public/prototype/projects.html` linked to v1's bare paths; those are v2's now.
  The prototype has served its purpose — delete the folder.

## The contact form

v1 and v2 share one submission path (`src/utils/contact.js`), and it is now a
deliberate pair rather than the accident it was:

1. **The form POSTs to Netlify Forms.** `public/index.html` carries a hidden
   registration copy of the form, so Netlify's build bot creates the `contact`
   form at deploy time; `submitContact()` sends the matching URL-encoded body
   and the page shows "Thanks — your message is on its way."
2. **A plain `mailto:` link sits beside the button** ("or email me directly").
   It carries whatever has been typed, so a failed POST — offline, local dev,
   or any host that is not Netlify — costs nobody their message.

Two things that were wrong before and are fixed here: the honeypot attribute
`netlify-honeypot="bot-field"` named a field that did not exist (there is now a
real, off-screen `bot-field` input, and `submitContact` sends it empty), and the
old `preventDefault` + `window.location` handoff meant the Netlify form was
registered but could never receive anything.

## Open items

1. **Poppins still blocks first paint.** `src/index.css` `@import`s nine weights
   plus italics, which is render-blocking for v2 too. Moving it to a `<link>` in
   `index.html` — the way v2's fonts load — is a one-line v1 change.
2. **Captions are derived, not authored.** `captionFor()` turns
   `app_settings_withdrawal-settings.jpeg` into "App Settings Withdrawal". Real
   captions belong in `projects.json` as `{ src, caption }` objects.
3. **`shiga-digital` repeats its cover as `showcase[0]`** in the data. v2 skips
   it; the data should not contain it.
4. **Content edits need sign-off** — the "platform. now," fix above.
5. **`og:url` is `https://www.devjosh.me/`**, which is now correct for v2 and
   wrong for `/v1` (v1's pages share v2's social card). Moot once v1 goes.
6. **The contact form only really submits on Netlify.** Off Netlify the POST
   fails by design and the mailto link takes over. Worth switching to Netlify's
   dashboard notifications so a submission actually reaches an inbox.

## Verification

`npm run build` compiles clean (the only warnings are pre-existing
`react-parallax-tilt` source-map noise), and `npm test` runs 26 v2 tests: route
resolution for both trees, the v1 link prefixing, the year filter, the gallery,
prev/next, the lightbox, the copy button, the Netlify POST and its mailto
fallback, and the accessible names.

Caveat, stated plainly: this environment has no browser, so **the rendered
appearance of the port is not machine-verified.** A `200` from the dev server
only means `index.html` was served — client-side route resolution is what the
tests prove. Layout and colour are covered by tests and measured contrast
ratios, but "does it actually look right" is a judgement only a real render can
settle — please eyeball `/` and `/v1` before anything else is built on this.
