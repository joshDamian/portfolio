import { useEffect, useState } from "react";
import avatar from "../../images/joshdamian.png";

/* A small pinned cluster beside the hero headline — the pin board in
   miniature. Decorative in feel, but every piece carries real text, so it is
   readable by assistive tech rather than hidden from it. */

const TIME_ZONE = "Africa/Lagos"; // WAT — one zone for all of Nigeria

/* A light guess at what Josh is doing, by local hour. Edit freely. */
function guess(hour) {
  if (hour < 6) return "probably asleep";
  if (hour < 8) return "probably on the court";
  if (hour < 18) return "probably shipping";
  if (hour < 22) return "probably winding down";
  return "probably still shipping";
}

function localTime(now) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = parts.find((p) => p.type === "minute").value;
  return { label: `${String(hour).padStart(2, "0")}:${minute}`, hour };
}

export default function HeroPins() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { label, hour } = localTime(now);

  return (
    <div className="hero-pins">
      <figure className="hero-pin hero-pin--photo">
        <img
          src={avatar}
          width="310"
          height="310"
          alt="Illustrated avatar of Josh wearing headphones"
          decoding="async"
        />
        <figcaption>me, mid-deploy</figcaption>
      </figure>

      <p className="hero-pin hero-pin--clock">
        <span className="hero-pin__k">Nigeria · WAT</span>
        <time className="hero-pin__time" dateTime={now.toISOString()}>
          {label}
        </time>
        <span className="hero-pin__guess">{guess(hour)}</span>
      </p>
    </div>
  );
}
