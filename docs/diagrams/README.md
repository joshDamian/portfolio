# Bench architecture diagrams

The two C4 diagrams on the Bench case study, kept as editable source.

| File | What it is |
| --- | --- |
| `c4.mjs` | A small drawing kit: boxes, cylinder, boundary, labelled arrows, key. Emits SVG. It throws if a box's text would overflow it. |
| `bench-container.mjs` → `bench-container.svg` | Level 2, Container. |
| `bench-component.mjs` → `bench-component.svg` | Level 3, the API server's components. |
| `render.mjs` | SVG → PNG at 2x with headless Chromium (`playwright-core`). |

## Rebuild

```sh
node docs/diagrams/bench-container.mjs
node docs/diagrams/bench-component.mjs
node docs/diagrams/render.mjs docs/diagrams/bench-container.svg public/project-images/bench/c4-container.png
node docs/diagrams/render.mjs docs/diagrams/bench-component.svg public/project-images/bench/c4-component.png
```

`render.mjs` needs `playwright-core` and a Chromium; set `CHROME_PATH` to choose
the binary. It is not a dependency of the site.

After re-rendering, give the PNGs a new filename (browsers cache these hard),
then update `src/data/projects.json`, `src/v2/data/imageSizes.js` with the new
size (the PNG is twice the SVG's width and height), the test in
`src/v2/__tests__/v2.test.jsx`, and the `alt` text if a relationship changed.

## Conventions

- Arrows are dependencies, labelled with the intent, then the `[technology]`.
- Colours: people dark blue, containers pale blue, components white, external
  systems grey. Data stores are cylinders.
- Logical canvas is ~1700px wide so body text stays legible when the case study
  shows it at ~1040px.

## Facts these encode (checked against the Bench source, Oct 2026)

- The server listens on plain HTTP; HTTPS comes only from `tailscale serve`,
  which the CLI's `bench share` sets up.
- The server makes no model-provider calls. The Agent SDK spawns `claude`, which
  calls the provider.
- Notifications go out through `web-push` (VAPID).
- The CLI calls `Service` in-process for most commands, the running server over
  HTTP for `pair`, `devices` and `revoke`, and reads `Store` for `bench shell`.
