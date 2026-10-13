// Bench API server, C4 Level 3 (Component). One box per module in src/, with
// the import edges that carry real work. Checked against the source, Oct 2026.
import { writeFileSync } from "node:fs";
import { Diagram, C } from "./c4.mjs";

const d = new Diagram(1720, 1272);
d.title("Bench · API server, component diagram", "C4 Level 3: the modules inside the API server container, and what they reach.");

const Z = C.zone;
const W = 250;
const c1 = 330, c2 = 690, c3 = 1050, c4 = 1410;
const r1 = 340, r2 = 540, r3 = 740, H = 130;

// Callers and the push services, above the boundary.
d.box(870, 120, 240, 110, "Web application", "[Container: Preact + htm]", "The browser client.", "container");
d.box(c4, 120, W, 130, "Web push services", "[Software system]", "Deliver notifications to paired devices.", "external");
d.box(30, r2, 240, 150, "bench CLI", "[Container: Node.js]", "Most commands call Service in-process.", "container");

d.boundary(300, 300, 1390, 610, "API server", "[Container: Node.js]");

d.box(c1, r1, W, H, "metrics.mjs", "[Component]", "Host and process metrics for the dashboard.");
d.box(c2, r1, c3 + W - c2, H, "server.mjs", "[Component]", "HTTP routes, auth and pairing, the event hub, terminals over WebSocket, Web Push.");
d.box(c4, r1, W, H, "terminal.mjs", "[Component]", "PTYs that outlive the socket that opened them.");
d.box(c2, r2, c3 + W - c2, H, "service.mjs", "[Component]", "Projects, tasks and sessions, and the git work each one does.");
d.box(c4, r2, W, H, "providers.mjs", "[Component]", "Provider environments and model catalogs.");
d.box(c1, r3, W, H, "store.mjs", "[Component]", "SQLite schema, migration and every query.");
d.box(c2, r3, W, H, "git.mjs", "[Component]", "git and gh as child processes.");
d.box(c3, r3, W, H, "runtime.mjs", "[Component]", "One Agent SDK query() per live session.");

// Below the boundary.
d.cylinder(c1, 970, W, 160, "Database", "[Container: SQLite]", "One file under $BENCH_ROOT.");
d.box(c2, 970, W, 140, "git & GitHub", "[Software system]", "Local repositories, remotes and pull requests.", "external");
d.box(c3, 970, W, 140, "Claude Code", "[Software system]", "Spawned by the Agent SDK.", "external");
d.box(c4, 970, W, 140, "Model providers", "[Software system]", "Anthropic, DeepSeek, OpenRouter, Fireworks.", "external");

const mid = (c2 + c3 + W) / 2; // centre of the wide boxes
d.arrow(990, 230, 990, r1, "Calls the API", "JSON, WebSocket", { at: "right", dy: -2 });
d.arrow(c3 + W, r1 + 20, c4 + 40, 250, "Notifies devices", "Web Push", { dx: -18, dy: -4 });
d.arrow(270, r2 + 60, c2, r2 + 60, "Same operations", "in-process", { at: "above", halo: Z, dx: 40 });
d.arrow(200, r2 + 150, c1 + 20, r3, "Provider settings", "bench shell", { dx: -40, dy: 16 });

d.arrow(c2, r1 + 65, c1 + W, r1 + 65, "Host metrics", null, { at: "above", halo: Z, dy: 10 });
d.arrow(c3 + W, r1 + 65, c4, r1 + 65, "Terminals", null, { at: "above", halo: Z, dy: 10 });
d.arrow(mid, r1 + H, mid, r2, "Delegates every operation", null, { at: "right", halo: Z, dy: 4 });

d.arrow(c2 + 40, r2 + H, c1 + W - 40, r3, "Reads & writes", null, { halo: Z, dx: -10 });
d.arrow(c2 + 125, r2 + H, c2 + 125, r3, "Branches, worktrees, merges", null, { at: "right", halo: Z, dy: 4 });
d.arrow(c3 + 125, r2 + H, c3 + 125, r3, "Starts & resumes sessions", null, { at: "right", halo: Z, dy: 4 });
d.arrow(c3 + W, r3 + 65, c4 + 125, r2 + H, "Provider env & models", null, { halo: Z, dx: 26, dy: 8 });

d.arrow(c1 + 125, r3 + H, c1 + 125, 970, "Reads & writes", "node:sqlite", { at: "right", dy: 4 });
d.arrow(c2 + 125, r3 + H, c2 + 125, 970, "Runs git & gh", "child processes", { at: "right", dy: 4 });
d.arrow(c3 + 125, r3 + H, c3 + 125, 970, "Runs sessions", "Agent SDK", { at: "right", dy: 4 });
d.arrow(c3 + W, 1040, c4, 1040, "Calls models", "HTTPS", { at: "above" });

d.key(48, 1170, [
  { kind: "component", label: "Component" },
  { kind: "container", label: "Container" },
  { kind: "cylinder", label: "Data store" },
  { kind: "external", label: "External system" },
  { kind: "arrow", label: "Dependency: intent, then [technology]" },
]);
d.note(1220, "C4 model, Level 3. env.mjs (configuration) and contract.d.mts (the wire types shared with the browser) are used throughout; providers.mjs also lends env helpers to most modules. Omitted for clarity.");
d.note(1242, "bench pair, devices and revoke reach server.mjs over HTTP instead, as the container diagram shows.");

writeFileSync(new URL("./bench-component.svg", import.meta.url), d.svg());
console.log("wrote bench-component.svg");
