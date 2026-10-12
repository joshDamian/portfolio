import { v2Routes } from "../config";

/* ---------------------------------------------------------------------------
   Shared formatting helpers for v2.
--------------------------------------------------------------------------- */

/* projects.json mixes "./project-images/x.png" (relative) with
   "/project-images/x.png" (absolute). The relative ones only resolve because
   the index happens to sit at /projects — they break under a subpath or a
   nested route. Normalising both here is the fix; doing it in the data would
   be better still. */
export function asset(path) {
  const p = String(path || "");
  if (p.startsWith("./")) return `/${p.slice(2)}`;
  if (!p.startsWith("/")) return `/${p}`;
  return p;
}

export function yearOf(timestamp) {
  return String(timestamp || "").trim().split(/\s+/).pop();
}

export function yearsOf(projects) {
  const years = [];
  projects.forEach((p) => {
    const y = yearOf(p.timestamp);
    if (!years.includes(y)) years.push(y);
  });
  return years;
}

export function showcaseOf(project) {
  return (project.showcase || []).map((item) => asset(project.mediaFolder + item));
}

export function projectHref(project) {
  return project.id ? v2Routes.caseStudy(project.id) : project.url;
}

/* Auto-derived placeholder captions. These belong in the data — see the note
   in src/v2/README.md about turning showcase[] into objects with captions. */
const TOKENS = { tx: "Transaction", nft: "NFT", id: "ID", fiat: "Fiat", rwa: "RWA" };

export function captionFor(path) {
  const base = String(path).split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  return base
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .split(/\s+/)
    .filter((w) => w && w.toLowerCase() !== "full")
    // Collapse repeats: "app_settings_withdrawal-settings" would otherwise
    // read "App Settings Withdrawal Settings".
    .filter((w, i, all) => all.findIndex((x) => x.toLowerCase() === w.toLowerCase()) === i)
    .map((w) => {
      const token = TOKENS[w.toLowerCase()];
      if (token) return token;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

/* Full-page captures span both columns and are height-capped; very wide
   screenshots also span both. Everything else pairs up two-across. */
export function gallerySpan(path, size) {
  if (/_full\./.test(path)) return "is-wide is-tall";
  const ratio = size[0] / size[1];
  return ratio >= 1.85 ? "is-wide" : "";
}

/* The contact form hands off to the OS mail client rather than posting
   anywhere (same as v1 — see src/v2/README.md). Composing the URL is a pure
   function so the encoding can be checked without a browser. */
export function mailtoHref(to, { name, email, subject, message }) {
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${to}?subject=${encodeURIComponent(subject || "Hello")}&body=${body}`;
}
