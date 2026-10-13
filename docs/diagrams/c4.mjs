/* ---------------------------------------------------------------------------
   A tiny C4 drawing kit: boxes, a data-store cylinder, a system boundary,
   straight arrows with haloed labels, and a key. It emits plain SVG, so the
   diagrams stay editable text in the repo. See README.md for how they are
   rendered to PNG.

   Every coordinate is in logical pixels. The canvas is drawn at ~1650 wide so
   that, shown at the case study's ~1040px, body text lands near 10px; the PNG
   is rendered at 2x for the full-size view.
--------------------------------------------------------------------------- */

export const C = {
  bg: "#f2f8fb",
  paper: "#ffffff",
  ink: "#0c2230",
  text2: "#39505f",
  text3: "#587080",
  accent: "#1d6c96",
  accentDeep: "#155578",
  sky: "#87ceeb",
  zone: "#e3f1f8", // boundary fill, opaque so label halos can match it
  container: "#eaf5fa",
  containerLine: "#8fc9e0",
  extFill: "#eceff2",
  extLine: "#9aa6b2",
  extText: "#4a5560",
  arrow: "#5b6b78",
};

const SANS = "'DejaVu Sans','Liberation Sans',Arial,sans-serif";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* DejaVu Sans averages ~0.56em per character; good enough to wrap by. */
export function wrap(text, width, size) {
  const max = Math.max(8, Math.floor(width / (size * 0.56)));
  const out = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if ((line + " " + word).trim().length > max) {
      out.push(line.trim());
      line = word;
    } else line += " " + word;
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

export class Diagram {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.parts = [];
  }
  add(s) {
    this.parts.push(s);
  }
  text(x, y, s, { size = 16, fill = C.text2, weight = 400, anchor = "start", halo = null, ls = 0 } = {}) {
    const h = halo ? ` paint-order="stroke" stroke="${halo}" stroke-width="7" stroke-linejoin="round"` : "";
    const l = ls ? ` letter-spacing="${ls}"` : "";
    this.add(`<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${l}${h}>${esc(s)}</text>`);
  }
  rect(x, y, w, h, { fill = C.paper, stroke = C.accent, sw = 2, r = 10, dash = null } = {}) {
    this.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`);
  }

  title(main, sub) {
    this.text(48, 62, main, { size: 34, weight: 700, fill: C.ink });
    this.text(48, 94, sub, { size: 17, fill: C.text2 });
  }

  /* kind: "person" | "container" | "component" | "external" */
  box(x, y, w, h, name, type, desc, kind = "component") {
    const style = {
      person: { fill: C.accent, stroke: C.accentDeep, sw: 2, name: "#fff", type: "#d6ecf7", desc: "#eaf4fa" },
      component: { fill: C.paper, stroke: C.accent, sw: 2.5, name: C.ink, type: C.accent, desc: C.text2 },
      container: { fill: C.container, stroke: C.containerLine, sw: 2, name: C.ink, type: C.accent, desc: C.text2 },
      external: { fill: C.extFill, stroke: C.extLine, sw: 2, name: C.extText, type: C.extText, desc: "#5b6672" },
    }[kind];
    this.rect(x, y, w, h, { fill: style.fill, stroke: style.stroke, sw: style.sw });
    let tx = x + 18;
    if (kind === "person") {
      // a simple head-and-shoulders glyph
      this.add(`<circle cx="${x + 34}" cy="${y + 34}" r="10" fill="#fff"/><path d="M${x + 18} ${y + 66} a16 14 0 0 1 32 0 z" fill="#fff"/>`);
      tx = x + 62;
    }
    this.text(tx, y + 30, name, { size: 18, weight: 700, fill: style.name });
    this.text(tx, y + 52, type, { size: 13, weight: 700, fill: style.type });
    const lines = wrap(desc, w - (tx - x) - 16, 15);
    lines.forEach((l, i) => this.text(tx, y + 78 + i * 20, l, { size: 15, fill: style.desc }));
    const needed = 78 + (lines.length - 1) * 20 + 12;
    if (needed > h) throw new Error(`"${name}" overflows: needs ${needed}px, has ${h}`);
  }

  cylinder(x, y, w, h, name, type, desc, kind = "container") {
    const ry = 14;
    const fill = kind === "external" ? C.extFill : C.paper;
    const stroke = kind === "external" ? C.extLine : C.accent;
    this.add(
      `<path d="M${x} ${y + ry} L${x} ${y + h - ry} A${w / 2} ${ry} 0 0 0 ${x + w} ${y + h - ry} L${x + w} ${y + ry}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>` +
        `<ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w / 2}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`
    );
    this.text(x + 18, y + ry + 40, name, { size: 18, weight: 700, fill: C.ink });
    this.text(x + 18, y + ry + 62, type, { size: 13, weight: 700, fill: C.accent });
    const lines = wrap(desc, w - 36, 15);
    lines.forEach((l, i) => this.text(x + 18, y + ry + 88 + i * 20, l, { size: 15, fill: C.text2 }));
    if (ry + 88 + (lines.length - 1) * 20 + ry + 8 > h) throw new Error(`"${name}" overflows`);
  }

  boundary(x, y, w, h, name, type) {
    this.rect(x, y, w, h, { fill: C.zone, stroke: C.sky, sw: 2, r: 16, dash: "10 7" });
    const nameW = name.length * 12.5;
    const chipW = 16 + nameW + 14 + type.length * 7.6 + 16;
    this.rect(x + 22, y - 20, chipW, 40, { fill: C.accent, stroke: C.accentDeep, sw: 1.5, r: 8 });
    this.text(x + 38, y + 7, name, { size: 18, weight: 700, fill: "#fff" });
    this.text(x + 38 + nameW + 14, y + 6, type, { size: 13, fill: "#d6ecf7" });
  }

  /* A straight arrow with a two-line label (intent, then [technology]).
     at: "mid" puts the label centred on the line with a halo; "above" lifts
     it clear of a horizontal line; "right" sets it beside a vertical one. */
  arrow(x1, y1, x2, y2, intent, tech, { at = "mid", halo = C.bg, dx = 0, dy = 0 } = {}) {
    this.add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.arrow}" stroke-width="2" marker-end="url(#ah)"/>`);
    let lx = (x1 + x2) / 2 + dx;
    let ly = (y1 + y2) / 2 + dy;
    let anchor = "middle";
    if (at === "above") ly -= 26;
    if (at === "right") {
      lx += 10;
      anchor = "start";
      ly -= 6;
    }
    if (at === "mid") ly -= 6;
    this.text(lx, ly, intent, { size: 14, weight: 700, fill: C.text2, anchor, halo });
    if (tech) this.text(lx, ly + 18, `[${tech}]`, { size: 13, fill: C.text3, anchor, halo });
  }

  key(x, y, items) {
    let cx = x;
    this.text(cx, y + 6, "Key", { size: 14, weight: 700, fill: C.accent, ls: 1.5 });
    cx += 50;
    for (const it of items) {
      if (it.kind === "arrow") {
        this.add(`<line x1="${cx}" y1="${y}" x2="${cx + 40}" y2="${y}" stroke="${C.arrow}" stroke-width="2" marker-end="url(#ah)"/>`);
        cx += 52;
      } else if (it.kind === "cylinder") {
        this.add(`<path d="M${cx} ${y - 8} L${cx} ${y + 10} A14 5 0 0 0 ${cx + 28} ${y + 10} L${cx + 28} ${y - 8}" fill="${C.paper}" stroke="${C.accent}" stroke-width="2"/><ellipse cx="${cx + 14}" cy="${y - 8}" rx="14" ry="5" fill="${C.paper}" stroke="${C.accent}" stroke-width="2"/>`);
        cx += 38;
      } else {
        const s = {
          person: [C.accent, C.accentDeep],
          component: [C.paper, C.accent],
          container: [C.container, C.containerLine],
          external: [C.extFill, C.extLine],
        }[it.kind];
        this.rect(cx, y - 13, 28, 26, { fill: s[0], stroke: s[1], sw: 2, r: 5 });
        cx += 38;
      }
      this.text(cx, y + 5, it.label, { size: 14, fill: C.text2 });
      cx += it.label.length * 7.9 + 30;
    }
  }

  note(y, s) {
    this.text(48, y, s, { size: 14, fill: C.text3 });
  }

  svg() {
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${this.w}" height="${this.h}" viewBox="0 0 ${this.w} ${this.h}">`,
      `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.arrow}"/></marker></defs>`,
      `<rect width="${this.w}" height="${this.h}" fill="${C.bg}"/>`,
      ...this.parts,
      `</svg>`,
    ].join("\n");
  }
}
