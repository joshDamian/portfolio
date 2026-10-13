import fs from "fs";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import projects from "../../data/projects.json";
import { EXPERIENCE } from "../data/experience";
import PINS from "../data/pins";
import { TYPE_LABEL } from "../components/PinCard";
import { yearOf, yearsOf, mailtoHref } from "../lib/format";
import { MY_EMAIL } from "../../constants/strings";

/* App.jsx calls AOS.init() at module scope. It is a scroll-animation library
   with nothing to say about v2's markup, and its observers are noise here. */
vi.mock("aos", () => ({ __esModule: true, default: { init: vi.fn() } }));

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe("v1 + v2 coexistence", () => {
  it("serves v2 at the bare paths", () => {
    renderAt("/");
    expect(document.querySelector(".v2-root")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hi, I'm Josh. I build software people use."
    );
  });

  it("serves v1 under its version prefix", () => {
    renderAt("/v1");
    expect(document.querySelector(".v2-root")).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })[0]).toHaveTextContent(
      /Software Developer/
    );
  });

  it("keeps every v1 nav link inside the prefix", () => {
    renderAt("/v1/about");
    const nav = document.querySelector("aside");
    const hrefs = within(nav)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/v1", "/v1/about", "/v1/projects", "/v1/contact"]);
  });

  it("prefixes v1's internal case-study links but leaves external ones alone", () => {
    renderAt("/v1/projects");
    const hrefs = Array.from(document.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    // The internal target comes from projects.json's url field, which is
    // unprefixed in the data — the prefix is applied at the link site.
    expect(hrefs).toContain("/v1/projects/globachain-merchant");
    expect(hrefs).toContain("https://www.useazza.com");
    expect(hrefs).not.toContain("/projects/globachain-merchant");
  });
});

describe("v2 shell", () => {
  it("marks the skip link and main target", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#v2-main"
    );
    expect(document.getElementById("v2-main")).toBeTruthy();
  });

  it("carries no reference to the previous version", () => {
    renderAt("/");
    expect(screen.queryByText(/still live/)).toBeNull();
    expect(screen.queryByRole("link", { name: "Previous version" })).toBeNull();
    // v1 stays reachable by URL (see the coexistence tests), but v2 never links to it.
    const hrefs = Array.from(document.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs.some((h) => h === "/v1" || h?.startsWith("/v1/"))).toBe(false);
  });

  it("marks the current nav item", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("keeps Projects current on a nested case-study route", () => {
    renderAt("/projects/shiga-digital");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("toggles the mobile nav disclosure and closes it on Escape", () => {
    renderAt("/");
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    const closed = screen.getByRole("button", { name: "Close" });
    expect(closed).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("v2-nav-links")).toHaveAttribute("data-open", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});

describe("v2 home", () => {
  it("pins a photo and a local-time card beside the headline", () => {
    renderAt("/");
    const avatar = screen.getByRole("img", { name: /Photo of Josh/ });
    expect(avatar).toHaveAttribute("width", "640");
    expect(avatar).not.toHaveAttribute("loading");
    expect(screen.getByText("Nigeria · WAT")).toBeInTheDocument();
    expect(document.querySelector(".hero-pin__time").textContent).toMatch(/^\d{2}:\d{2}$/);
    expect(document.querySelector(".hero-pin__guess").textContent).toMatch(/^probably /);
  });

  it("reads as one sentence for screen readers", () => {
    renderAt("/");
    // The space after <br /> is doing real work: without it this asserts as
    // "Hi, I'm Josh.I build software people use."
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hi, I'm Josh. I build software people use."
    );
  });

  it("shows the three most recent projects, linking each appropriately", () => {
    renderAt("/");
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(3);

    // Bench is the newest entry, and a case study: it routes in-app — no full
    // reload, unlike v1's bare anchors.
    const internal = within(cards[0]).getByRole("link", { name: "Bench" });
    expect(internal).toHaveAttribute("href", "/projects/bench");
    expect(internal).not.toHaveAttribute("target");

    // External live sites open in a new tab and say so.
    const external = within(cards[1]).getByRole("link", { name: /UseAzza/ });
    expect(external).toHaveAttribute("href", "https://www.useazza.com");
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
    expect(external).toHaveAccessibleName(/opens in a new tab/);
  });

  it("renders a measured intrinsic size on every card image", () => {
    renderAt("/");
    // Scoped to the project cards: the hero avatar is above the fold, so it
    // is deliberately not lazy-loaded.
    const cardImages = screen.getAllByRole("article").flatMap((card) => within(card).getAllByRole("img"));
    expect(cardImages).toHaveLength(3);
    cardImages.forEach((img) => {
      expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
      expect(img).toHaveAttribute("loading", "lazy");
    });
  });
});

describe("v2 projects index", () => {
  it("states the real totals and pins the year grouping", () => {
    const shiga = projects.find((p) => p.id === "shiga-digital");
    expect(projects).toHaveLength(13);
    expect(yearsOf(projects)).toEqual(["2026", "2024", "2023", "2022", "2021"]);
    expect(projects.filter((p) => yearOf(p.timestamp) === "2023")).toHaveLength(5);
    expect(shiga).toBeTruthy();

    renderAt("/projects");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Projects");
    expect(
      screen.getByText(/Things I.ve built since 2021/)
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Showing all 13 projects");
  });

  it("filters by year and reports what is showing", () => {
    renderAt("/projects");
    const groups = document.querySelectorAll(".yeargroup");
    expect(groups).toHaveLength(5);

    const all = screen.getByRole("button", { name: "All" });
    expect(all).toHaveAttribute("aria-pressed", "true");

    const y2023 = screen.getByRole("button", { name: "2023" });
    fireEvent.click(y2023);

    expect(y2023).toHaveAttribute("aria-pressed", "true");
    expect(all).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status")).toHaveTextContent("Showing 5 projects from 2023");

    // Hidden is the whole mechanism — see the CSS regression test below.
    // Groups follow the year order: 2026, 2024, 2023, 2022, 2021.
    expect(groups[2].hidden).toBe(false);
    expect(groups[0].hidden).toBe(true);
    expect(groups[1].hidden).toBe(true);
    expect(groups[3].hidden).toBe(true);
    expect(groups[4].hidden).toBe(true);

    fireEvent.click(all);
    expect(screen.getByRole("status")).toHaveTextContent("Showing all 13 projects");
    document.querySelectorAll(".yeargroup").forEach((group) => {
      expect(group.hidden).toBe(false);
    });
  });

  /* `.yeargroup` sets `display: grid` in author CSS, which outranks the UA
     sheet's `[hidden] { display: none }` at equal specificity — so without an
     explicit rule the filter sets the attribute and nothing hides. jsdom loads
     no stylesheets, so this invariant is checked against the source. */
  it("keeps an explicit display rule for hidden year groups", () => {
    const css = fs.readFileSync("src/v2/v2.css", "utf8");
    expect(css).toMatch(/\.yeargroup\[hidden\]\s*\{\s*display:\s*none/);
  });
});

describe("v2 case study", () => {
  it("skips the cover repeated inside the showcase data", () => {
    const shiga = projects.find((p) => p.id === "shiga-digital");
    // The data repeats its cover as showcase[0]; only the rest is a gallery.
    // showcaseOf() joins mediaFolder + item, so the leading slash matters.
    expect(shiga.showcase[0]).toBe("/cover.png");
    expect(shiga.mediaFolder + shiga.showcase[0]).toBe(shiga.image);
    expect(shiga.showcase).toHaveLength(8);

    renderAt("/projects/shiga-digital");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shiga Digital");
    expect(document.querySelectorAll(".gallery figure")).toHaveLength(7);

    const meta = Array.from(document.querySelectorAll(".meta__v")).map((el) => el.textContent);
    expect(meta).toEqual([yearOf(shiga.timestamp), "7", "Development lead"]);
  });

  it("shows Bench: solo role, Sep 2026, a public repo and 12 screens", () => {
    const bench = projects.find((p) => p.id === "bench");
    expect(bench).toBeTruthy();
    expect(bench.timestamp).toBe("Sep 2026");
    expect(bench.url).toBe("https://github.com/joshDamian/bench-ai");

    renderAt("/projects/bench");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bench");
    // No cover repeated in the showcase data, so all twelve are a gallery.
    expect(document.querySelectorAll(".gallery figure")).toHaveLength(12);

    // The two C4 diagrams are their own section, not a thirteenth screen.
    expect(screen.getByRole("heading", { name: /How it.s built/ })).toBeInTheDocument();
    const diagrams = document.querySelectorAll(".diagram img");
    expect(diagrams).toHaveLength(2);
    expect(diagrams[0]).toHaveAttribute("src", "/project-images/bench/c4-container.png");
    expect(diagrams[1]).toHaveAttribute("src", "/project-images/bench/c4-component.png");
    expect(Number(diagrams[1].getAttribute("width"))).toBeGreaterThan(0);

    const meta = Array.from(document.querySelectorAll(".meta__v")).map((el) => el.textContent);
    expect(meta).toEqual(["2026", "12", "Solo builder"]);

    // Bench's case study points at its public repo, so the link is external
    // and says so.
    const repo = screen.getByRole("link", { name: /View the repository/ });
    expect(repo).toHaveAttribute("href", "https://github.com/joshDamian/bench-ai");
    expect(repo).toHaveAttribute("target", "_blank");
    expect(repo).toHaveAttribute("rel", "noopener noreferrer");
    expect(repo).toHaveAccessibleName(/opens in a new tab/);
  });

  it("wires prev/next across the four case studies, wrapping", () => {
    renderAt("/projects/shiga-digital");
    const links = within(document.querySelector(".pager")).getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "aria-label",
      "Previous case study: GlobaChain Payment Gateway"
    );
    expect(links[0]).toHaveAttribute("href", "/projects/globachain-merchant");
    expect(links[1]).toHaveAttribute("aria-label", "Next case study: Plotpeer");
    expect(links[1]).toHaveAttribute("href", "/projects/plotpeer");

    // The direction words are decorative; the aria-label carries the meaning.
    expect(links[0].querySelector(".pager__dir")).toHaveAttribute("aria-hidden", "true");
  });

  it("opens a lightbox on a gallery screen and closes it", () => {
    renderAt("/projects/plotpeer");
    const thumbs = screen.getAllByRole("button", { name: /^View .* full size$/ });
    expect(thumbs).toHaveLength(5);
    expect(document.querySelector(".lightbox img")).toBeNull();

    fireEvent.click(thumbs[0]);
    const lightboxImage = document.querySelector(".lightbox img");
    expect(lightboxImage).toBeTruthy();
    expect(lightboxImage.getAttribute("src")).toMatch(/^\/project-images\/plotpeer\/showcase\//);

    // Not getByRole: jsdom has no dialog.showModal(), so the <dialog> never
    // opens and its contents stay out of the accessibility tree.
    fireEvent.click(document.querySelector(".lightbox__close"));
    expect(document.querySelector(".lightbox img")).toBeNull();
  });

  it("reports an unknown project rather than crashing", () => {
    renderAt("/projects/nope");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("No such project");
    expect(screen.getByRole("link", { name: "projects index" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });
});

describe("v2 pinboard", () => {
  it("is in the nav and current on its own route", () => {
    renderAt("/pinboard");
    expect(screen.getByRole("link", { name: "Pinboard" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Things I like, mostly."
    );
  });

  it("renders every pin with a readable, openable label", () => {
    renderAt("/pinboard");
    const items = document.querySelectorAll(".board__item");
    expect(items).toHaveLength(PINS.length);
    PINS.forEach((pin) => {
      expect(
        screen.getByRole("button", { name: `${pin.kind || TYPE_LABEL[pin.type]}: ${pin.title}. Show details` })
      ).toBeInTheDocument();
    });
  });

  it("straightens everything in Tidy view and back", () => {
    renderAt("/pinboard");
    const pinned = screen.getByRole("button", { name: "Pinned" });
    const tidy = screen.getByRole("button", { name: "Tidy" });
    const tilts = () => Array.from(document.querySelectorAll(".board__item")).map((el) => el.style.getPropertyValue("--r"));

    expect(pinned).toHaveAttribute("aria-pressed", "true");
    expect(tilts().some((r) => r !== "0deg")).toBe(true);

    fireEvent.click(tidy);
    expect(tidy).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector(".board")).toHaveClass("board--tidy");
    expect(tilts().every((r) => r === "0deg")).toBe(true);

    fireEvent.click(pinned);
    expect(tilts().some((r) => r !== "0deg")).toBe(true);
  });

  it("drags with a mouse, but never with touch, so swipes scroll the page", () => {
    renderAt("/pinboard");
    const item = document.querySelector(".board__item");
    const offset = () => [item.style.getPropertyValue("--dx"), item.style.getPropertyValue("--dy")];

    // A touch swipe across a card: must not move it.
    fireEvent.pointerDown(item, { pointerType: "touch", button: 0, clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(item, { pointerType: "touch", clientX: 100, clientY: 260, pointerId: 1 });
    fireEvent.pointerUp(item, { pointerType: "touch", pointerId: 1 });
    expect(offset()).toEqual(["0px", "0px"]);

    // The same gesture with a mouse: a drag.
    fireEvent.pointerDown(item, { pointerType: "mouse", button: 0, clientX: 100, clientY: 100, pointerId: 2 });
    fireEvent.pointerMove(item, { pointerType: "mouse", clientX: 140, clientY: 160, pointerId: 2 });
    fireEvent.pointerUp(item, { pointerType: "mouse", pointerId: 2 });
    expect(offset()).toEqual(["40px", "60px"]);
  });

  it("opens the story on a plain mouse click (no pointer capture before a drag)", () => {
    renderAt("/pinboard");
    const item = document.querySelector(".board__item");
    const button = item.querySelector(".pin__open");
    // jsdom has no pointer capture, so record it: browsers retarget the click
    // to whichever element holds capture at pointerup.
    let captured = false;
    item.setPointerCapture = () => { captured = true; };

    fireEvent.pointerDown(button, { pointerType: "mouse", button: 0, clientX: 50, clientY: 50, pointerId: 3 });
    fireEvent.pointerUp(button, { pointerType: "mouse", pointerId: 3 });
    expect(captured).toBe(false);
    fireEvent.click(captured ? item : button);
    expect(document.querySelector(".pin-detail__title")).toBeInTheDocument();
  });

  /* jsdom applies no stylesheets and has no showModal(), so the scroll lock
     is checked against the source — the same approach as the yeargroup rule. */
  it("locks page scroll while a dialog is open", () => {
    const css = fs.readFileSync("src/v2/v2.css", "utf8");
    expect(css).toMatch(/html:has\(\.v2-root dialog\[open\]\)\s*\{[^}]*overflow:\s*hidden/);
    expect(css).toMatch(/\.pin-detail,\s*\.v2-root \.lightbox\s*\{[^}]*overscroll-behavior:\s*contain/);
  });

  it("shows real photos from local files, each with alt text and its own shape", () => {
    renderAt("/pinboard");
    const photos = PINS.filter((p) => p.type === "photo" && p.image);
    expect(photos.length).toBeGreaterThan(0);
    photos.forEach((pin) => {
      expect(fs.existsSync(`public${pin.image.src}`)).toBe(true);
      const img = document.querySelector(`.board img[src="${pin.image.src}"]`);
      expect(img).toHaveAttribute("alt", pin.image.alt);
      expect(img.parentElement.style.aspectRatio).toBe(`${pin.image.width} / ${pin.image.height}`);
    });
    // Treatments are classes on the pin, so the board and the dialog match.
    expect(document.querySelector(".pin--print-film")).toBeTruthy();
    expect(document.querySelector(".pin--print-sepia")).toBeTruthy();
  });

  it("shows each pin's avatar or cover from a local file", () => {
    renderAt("/pinboard");
    const withArt = PINS.filter((p) => p.art);
    expect(withArt.length).toBeGreaterThan(0);
    withArt.forEach((pin) => {
      expect(pin.art.src).toMatch(/^\/pin-images\//);
      expect(fs.existsSync(`public${pin.art.src}`)).toBe(true);
    });
    const imgs = document.querySelectorAll(".board .pin__art");
    expect(imgs).toHaveLength(withArt.length);
    // Decorative: the title beside it already names the pin.
    imgs.forEach((img) => expect(img).toHaveAttribute("alt", ""));
  });

  it("shuffles without losing a pin", () => {
    renderAt("/pinboard");
    fireEvent.click(screen.getByRole("button", { name: "Shuffle" }));
    const ids = Array.from(document.querySelectorAll(".board__item .pin__open")).map((b) => b.getAttribute("aria-label"));
    expect(new Set(ids).size).toBe(PINS.length);
  });

  it("opens a pin's detail view", () => {
    renderAt("/pinboard");
    const court = PINS.find((p) => p.id === "2bd2bth");
    expect(document.querySelector(".pin-detail__title")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Link: 2bd2bth\. Show details/ }));

    // Not getByRole: jsdom has no dialog.showModal(), so the dialog never opens
    // and stays out of the accessibility tree (same as the lightbox test).
    expect(document.querySelector(".pin-detail__title")).toHaveTextContent(court.title);
    expect(document.querySelector(".pin-detail__cap")).toHaveTextContent(court.caption);
    // No story written for it, so no empty story paragraph either.
    expect(document.querySelector(".pin-detail__story")).toBeNull();

    fireEvent.click(document.querySelector(".pin-detail__close"));
    expect(document.querySelector(".pin-detail__title")).toBeNull();
  });
});

describe("v2 about", () => {
  it("renders every role from the data", () => {
    expect(EXPERIENCE).toHaveLength(6);
    renderAt("/about");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Me");
    expect(document.querySelectorAll(".xp__item")).toHaveLength(6);
    expect(document.querySelectorAll(".xp__mark")).toHaveLength(6);

    expect(screen.getByRole("heading", { name: /Co-Founder & CTO/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Azza" })).toHaveAttribute(
      "href",
      "https://www.useazza.com"
    );
    expect(screen.getByRole("link", { name: "Blocverse Blog" })).toHaveAttribute(
      "href",
      "https://blog.blocverse.com"
    );
  });

  it("copies the email and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    renderAt("/about");
    fireEvent.click(screen.getByRole("button", { name: /Copy email/ }));

    expect(await screen.findByRole("button", { name: /Copied!/ })).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith(MY_EMAIL);
  });
});

describe("v2 contact", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 });
  });
  afterEach(() => {
    delete global.fetch;
  });

  it("associates every label with its field", () => {
    renderAt("/contact");
    expect(screen.getByLabelText("Your name")).toHaveAttribute("name", "name");
    expect(screen.getByLabelText("Your email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Subject")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "5");

    const socials = document.querySelector(".contact__socials");
    expect(within(socials).getAllByRole("link").map((a) => a.textContent)).toEqual([
      "LinkedIn ↗",
      "GitHub ↗",
      "Twitter ↗",
    ]);
  });

  it("composes the mailto fallback, collapsing an untouched form", () => {
    const url = mailtoHref(MY_EMAIL, {
      name: "Ada",
      email: "ada@example.com",
      subject: "",
      message: "Hello there",
    });
    // URLSearchParams in, URLSearchParams out: `+` decodes back to a space.
    const params = new URLSearchParams(url.slice(url.indexOf("?") + 1));
    expect(params.get("subject")).toBe("Hello");
    expect(params.get("body")).toBe("Name: Ada\nEmail: ada@example.com\n\nHello there");

    // No empty "Name: / Email:" husk when nothing has been typed.
    expect(mailtoHref(MY_EMAIL, {})).toBe(`mailto:${MY_EMAIL}?subject=Hello`);
  });

  it("posts the form to Netlify and confirms delivery", async () => {
    renderAt("/contact");
    expect(screen.getByRole("status")).toHaveTextContent(
      "This goes straight to my inbox."
    );

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText("Your email"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello there" } });
    fireEvent.click(screen.getByRole("button", { name: /Send message/ }));

    // Wait on the text, not the element: the status region always exists, so
    // findByRole resolves instantly against its idle copy.
    expect(
      await screen.findByText("Thanks, your message has been sent.")
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe("/");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");

    const body = new URLSearchParams(options.body);
    expect(body.get("form-name")).toBe("contact");
    expect(body.get("name")).toBe("Ada");
    expect(body.get("email")).toBe("ada@example.com");
    expect(body.get("message")).toBe("Hello there");
    // The honeypot goes out empty — a bot that fills it is dropped by Netlify.
    expect(body.get("bot-field")).toBe("");

    // A successful send clears the form.
    expect(screen.getByLabelText("Your name")).toHaveValue("");
  });

  it("surfaces the mailto fallback when the POST fails", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    renderAt("/contact");
    // jsdom enforces `required` on submit, so the mandatory fields have to be
    // filled or the submit never fires and the handler is never exercised.
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText("Your email"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello there" } });
    fireEvent.click(screen.getByRole("button", { name: /Send message/ }));

    expect(
      await screen.findByText("Couldn't send just now. Use the email link instead.")
    ).toBeInTheDocument();
    // The message is not lost — the fallback link carries it.
    expect(screen.getByRole("link", { name: /email me directly/i })).toHaveAttribute(
      "href",
      expect.stringContaining(`mailto:${MY_EMAIL}`)
    );
  });

  it("always offers the email fallback beside the button", () => {
    renderAt("/contact");
    const fallback = screen.getByRole("link", { name: /email me directly/i });
    expect(fallback).toHaveAttribute(
      "href",
      `mailto:${MY_EMAIL}?subject=Hello`
    );
  });
});

describe("scroll on navigation", () => {
  it("starts a freshly opened route at the top", () => {
    const scrollTo = vi.fn();
    const original = window.scrollTo;
    window.scrollTo = scrollTo;
    try {
      renderAt("/");
      scrollTo.mockClear();
      const nav = document.querySelector(".nav__links");
      fireEvent.click(within(nav).getByRole("link", { name: "Projects" }));
      expect(scrollTo).toHaveBeenCalledWith(0, 0);
    } finally {
      window.scrollTo = original;
    }
  });
});
