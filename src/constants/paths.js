/* ---------------------------------------------------------------------------
   v1's version prefix.

   v2 owns the canonical paths (/ , /projects, /about, /contact); v1 sits under
   /v1 so it stays reachable while the two are compared. Every internal link in
   v1 goes through v1Path(), which is what makes the move one constant instead
   of a scattered set of strings.

   Retiring v1 means deleting this file, the v1 route branch in App.jsx, and the
   /v1 entry in v2's footer.
--------------------------------------------------------------------------- */

export const V1_BASE = "/v1";

/* v1Path() with no argument is v1's home. */
export const v1Path = (path = "") => `${V1_BASE}${path}`;
