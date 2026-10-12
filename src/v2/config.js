/* ---------------------------------------------------------------------------
   v2 is the site. It sits at the bare paths — /, /projects, /about, /contact —
   and v1 is reachable under /v1 (see src/constants/paths.js).

   V2_BASE is still the single switch, so the previous arrangement is one edit
   away: set it back to "/v2" and point v1's prefix at "" instead.

   To retire v1 entirely: delete the v1 route branch in App.jsx, delete
   src/constants/paths.js and the /v1 footer link, then fold v2 into the app —
   drop the .v2-root prefix from v2.css, move its tokens to :root, and merge it
   into index.css.
--------------------------------------------------------------------------- */

export const V2_BASE = "";

/* Internal route helpers — everything v2 links to goes through these, so the
   base above is the only thing that ever needs changing. */
export const v2Routes = {
  home: V2_BASE || "/",
  projects: `${V2_BASE}/projects`,
  about: `${V2_BASE}/about`,
  contact: `${V2_BASE}/contact`,
  caseStudy: (id) => `${V2_BASE}/projects/${id}`,
};
