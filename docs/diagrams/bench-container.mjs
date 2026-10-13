// Bench, C4 Level 2 (Container). Checked against the Bench source, Oct 2026:
// - the server is plain HTTP (http.createServer); HTTPS only arrives through
//   `tailscale serve`, which `bench share` sets up from the CLI;
// - the server makes no model-provider calls itself; `claude` does;
// - notifications go out through web-push (VAPID) to the browsers' push services.
import { writeFileSync } from "node:fs";
import { Diagram, C } from "./c4.mjs";

const d = new Diagram(1680, 1030);
d.title("Bench · Container diagram", "C4 Level 2: the parts Bench is made of, and the systems it depends on.");
d.key(48, 150, [
  { kind: "person", label: "Person" },
  { kind: "container", label: "Container" },
  { kind: "cylinder", label: "Data store" },
  { kind: "external", label: "External system" },
  { kind: "arrow", label: "Dependency: intent, then [technology]" },
]);

d.boundary(290, 230, 690, 730, "Bench", "[Software system]");

d.box(30, 310, 210, 150, "Developer", "[Person]", "Codes with Claude, from a desk or a phone.", "person");
d.box(30, 660, 180, 160, "Tailscale", "[Software system]", "Private network to the developer's devices.", "external");

d.box(340, 320, 210, 140, "Web application", "[Container: Preact + htm]", "Single-page app, no build step. Runs in the browser.", "container");
d.box(700, 290, 240, 420, "API server", "[Container: Node.js]", "One process: routes, pairing and the event hub. Owns the Claude sessions, git worktrees and terminals.", "container");
d.box(340, 640, 210, 200, "bench CLI", "[Container: Node.js]", "serve, share, pair, shell and admin commands.", "container");
d.cylinder(700, 770, 240, 175, "Database", "[Container: SQLite]", "Projects, tasks, sessions and transcripts in one file.");

d.box(1110, 300, 240, 140, "Claude Code", "[Software system]", "Spawned by the Agent SDK: tools, permissions, transcript.", "external");
d.box(1110, 470, 240, 140, "git & GitHub", "[Software system]", "Local branches and worktrees; pull requests via gh.", "external");
d.box(1110, 640, 240, 140, "Web push services", "[Software system]", "Deliver notifications to paired devices.", "external");
d.box(1440, 300, 210, 140, "Model providers", "[Software system]", "Anthropic, DeepSeek, OpenRouter, Fireworks.", "external");

const Z = C.zone;
d.arrow(240, 390, 340, 390, "Uses", "HTTP", { at: "above" });
d.arrow(135, 460, 135, 660, "From a phone or tablet", "HTTPS over the tailnet");
d.arrow(210, 690, 400, 460, "Forwards remote traffic", "tailscale serve", { dx: 132, dy: -12, halo: C.zone });
d.arrow(340, 760, 210, 760, "Publishes it", "tailscale serve", { at: "above", dy: -4 });
d.arrow(550, 390, 700, 390, "Calls the API", "JSON, WebSocket", { at: "above", halo: Z });
d.arrow(550, 680, 700, 680, "Starts, pairs", "bench serve; HTTP", { at: "above", halo: Z });
d.arrow(550, 830, 700, 830, "Reads & writes", "node:sqlite", { at: "above", halo: Z });
d.arrow(820, 710, 820, 770, "Reads & writes", "node:sqlite", { at: "right", halo: Z, dy: -4 });
d.arrow(940, 370, 1110, 370, "Runs sessions", "Agent SDK", { at: "above" });
d.arrow(940, 540, 1110, 540, "Branches & PRs", "git, gh", { at: "above" });
d.arrow(940, 690, 1110, 690, "Notifies devices", "Web Push", { at: "above" });
d.arrow(1350, 370, 1440, 370, "Calls models", "HTTPS", { at: "above" });

d.note(1000, "C4 model, Level 2. The components inside the API server are drawn in the Level 3 diagram.");

writeFileSync(new URL("./bench-container.svg", import.meta.url), d.svg());
console.log("wrote bench-container.svg");
