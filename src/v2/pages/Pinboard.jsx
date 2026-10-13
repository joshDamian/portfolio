import { useRef, useState } from "react";
import PINS from "../data/pins";
import { PinBody, TYPE_LABEL } from "../components/PinCard";
import PinDetail from "../components/PinDetail";

/* Stable pseudo-random in [0, 1) from a string, so each pin's tilt, jitter and
   fastener are the same on every visit — a mess, but always the same mess. */
function hash(str, salt) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

const DRAG_THRESHOLD = 5; // px — below this, a press is a click, not a drag

function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Pinboard() {
  const [pins, setPins] = useState(PINS);
  const [tidy, setTidy] = useState(false);
  const [seed, setSeed] = useState(0);
  const [offsets, setOffsets] = useState({}); // id -> { x, y } after a drag
  const [open, setOpen] = useState(null);
  const drag = useRef(null);
  const [dragging, setDragging] = useState(null);

  /* Dragging is decoration: it only nudges a card with a transform, so the
     reading order, tab order and layout never change, and every pin stays
     reachable by keyboard. Off in Tidy view.

     Mouse and pen only. On touch, a swipe that starts on a card must scroll
     the page — so touch never starts a drag, the cards keep the browser's
     default touch-action, and a tap still opens the story. */
  const onPointerDown = (event, id) => {
    if (tidy || event.button !== 0 || event.pointerType === "touch") return;
    const base = offsets[id] || { x: 0, y: 0 };
    drag.current = { id, startX: event.clientX, startY: event.clientY, base, moved: false };
    /* No pointer capture yet. Capturing here retargets the pointerup — and so
       the click — to this <li> instead of the button inside it, which means a
       plain click never opens the story. Capture only once it's a real drag. */
  };

  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(d.id);
      // Now it's a drag: keep receiving moves even if the cursor outruns the card.
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    setOffsets((prev) => ({ ...prev, [d.id]: { x: d.base.x + dx, y: d.base.y + dy } }));
  };

  const onPointerUp = () => {
    if (drag.current?.moved) {
      // The click that follows a drag fires synchronously after pointerup;
      // flag it, then clear on the next tick so a drag released off the card
      // can't swallow the user's next genuine click.
      drag.current.suppressClick = true;
      setTimeout(() => {
        drag.current = null;
      }, 0);
    } else {
      drag.current = null;
    }
    setDragging(null);
  };

  const openPin = (pin) => {
    // A drag ends with a click on the same button; swallow that one.
    if (drag.current?.suppressClick) {
      drag.current = null;
      return;
    }
    drag.current = null;
    setOpen(pin);
  };

  const shuffle = () => {
    setPins(shuffled);
    setSeed((s) => s + 1);
    setOffsets({});
    setTidy(false);
  };

  return (
    <>
      <header className="section section--tight wrap">
        <span className="eyebrow">Pinboard</span>
        <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
          Things I keep <em className="pinboard__em">coming back to.</em>
        </h1>
        <p className="lead" style={{ marginTop: "var(--s4)" }}>
          YouTube channels I watch, music I&apos;ve had on repeat, a podcast, and my Tennis
          Clash channel.
        </p>

        <div className="chiprow pinboard__tools" role="group" aria-label="Board view">
          <button className="chip" type="button" aria-pressed={!tidy} onClick={() => setTidy(false)}>
            Pinned
          </button>
          <button className="chip" type="button" aria-pressed={tidy} onClick={() => setTidy(true)}>
            Tidy
          </button>
          <button className="chip" type="button" onClick={shuffle}>
            Shuffle
          </button>
          <span className="pinboard__hint">
            {tidy ? (
              "Lined up."
            ) : (
              <>
                <span className="pinboard__hint--pointer">Drag things around.</span>
                <span className="pinboard__hint--touch">Tap anything for its story.</span>
              </>
            )}
          </span>
        </div>
      </header>

      <section className="wrap pinboard-wrap" aria-label="Pins">
        <ul className={`board${tidy ? " board--tidy" : ""}`}>
          {pins.map((pin) => {
            const off = (!tidy && offsets[pin.id]) || { x: 0, y: 0 };
            const style = {
              "--r": tidy ? "0deg" : `${((hash(pin.id, 17 + seed) - 0.5) * 7).toFixed(2)}deg`,
              "--jx": tidy ? "0px" : `${((hash(pin.id, 11 + seed) - 0.5) * 18).toFixed(1)}px`,
              "--tr": `${(hash(pin.id, 3) * 8 - 4).toFixed(1)}deg`,
              "--dx": `${off.x}px`,
              "--dy": `${off.y}px`,
            };
            return (
              <li
                key={pin.id}
                className="board__item"
                style={style}
                data-dragging={dragging === pin.id ? "true" : undefined}
                onPointerDown={(event) => onPointerDown(event, pin.id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <article
                  className={`pin pin--${pin.type}${pin.print === "cyan" ? " pin--print-cyan" : ""}`}
                  data-fix={hash(pin.id, 7) > 0.45 ? "tape" : "pin"}
                >
                  <PinBody pin={pin} />
                  <button
                    className="pin__open"
                    type="button"
                    aria-label={`${pin.kind || TYPE_LABEL[pin.type]}: ${pin.title}. Show details`}
                    aria-haspopup="dialog"
                    onClick={() => openPin(pin)}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <PinDetail pin={open} onClose={() => setOpen(null)} />
    </>
  );
}
