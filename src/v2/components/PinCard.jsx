import PinScene from "./PinScene";

export const TYPE_LABEL = {
  photo: "Photo",
  playlist: "Playlist",
  quote: "Quote",
  note: "Note",
  link: "Link",
  book: "Book",
  artifact: "Artifact",
  ticket: "Ticket",
  score: "Match",
};

/* Photos can share a caption (two shots from one hike), so a photo's button
   also carries its alt text: every pin keeps a distinct accessible name. */
export function pinLabel(pin) {
  const what = pin.image?.alt ? `${pin.title} (${pin.image.alt})` : pin.title;
  return `${pin.kind || TYPE_LABEL[pin.type]}: ${what}. Show details`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function pinDate(ym) {
  if (!ym) return "";
  const [year, month] = ym.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Channel avatar or cover art. Decorative: the title sits right beside it.
   draggable=false so a mouse drag moves the pin, not a ghost of the image. */
function Art({ art }) {
  if (!art) return null;
  return (
    <img
      className={`pin__art pin__art--${art.shape || "square"}`}
      src={art.src}
      alt=""
      width="56"
      height="56"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

/* The visual for one pin, without any interactivity — shared by the board
   and the story dialog, so a pin looks the same in both places. */
export function PinBody({ pin }) {
  switch (pin.type) {
    case "photo":
      return (
        <>
          {/* A real photo keeps its own shape (portrait, landscape or a 2.39:1
              film frame); the drawn placeholder scenes stay 4:3. */}
          <div
            className="pin__media"
            style={pin.image ? { aspectRatio: `${pin.image.width} / ${pin.image.height}` } : undefined}
          >
            {pin.image ? (
              <img
                src={pin.image.src}
                width={pin.image.width}
                height={pin.image.height}
                alt={pin.image.alt || pin.title}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            ) : (
              <PinScene name={pin.scene} />
            )}
          </div>
          <p className="pin__cap">
            {pin.title}
            {pin.print === "cyan" && <span className="pin__print"> · sun print</span>}
          </p>
        </>
      );

    case "playlist": {
      const shown = pin.tracks.slice(0, 4);
      return (
        <>
          <p className="pin__kicker">
            <span className="pin__disc" aria-hidden="true" />
            {pin.kind || "Playlist"} · {pin.tracks.length} tracks
          </p>
          <div className="pin__head">
            <Art art={pin.art} />
            <div>
              <h3 className="pin__title">{pin.title}</h3>
              {pin.by && <p className="pin__sub">{pin.by}</p>}
            </div>
          </div>
          <ol className="pin__tracks">
            {shown.map(([title, artist], i) => (
              <li key={`${i}-${title}`}>
                <span>{title}</span>
                <span>{artist}</span>
              </li>
            ))}
          </ol>
          {pin.tracks.length > shown.length && (
            <p className="pin__more">+ {pin.tracks.length - shown.length} more</p>
          )}
        </>
      );
    }

    case "quote":
      return (
        <>
          <blockquote className="pin__quote">“{pin.quote}”</blockquote>
          <p className="pin__by">{pin.by}</p>
        </>
      );

    case "artifact":
      return pin.code ? (
        <>
          <p className="pin__kicker">Artifact · {pinDate(pin.date)}</p>
          <pre className="pin__code">
            <code>{pin.code}</code>
          </pre>
          <p className="pin__cap">{pin.title}</p>
        </>
      ) : (
        <>
          <p className="pin__kicker">Artifact</p>
          <p className="pin__big">{pin.title}</p>
          <p className="pin__sub">{pin.caption}</p>
        </>
      );

    case "score":
      return (
        <>
          <p className="pin__kicker">Match{pin.place ? ` · ${pin.place}` : ""}</p>
          <table className="pin__score">
            <tbody>
              <tr>
                <th scope="row">Josh</th>
                {pin.score.map(([mine, theirs], i) => (
                  <td key={i} className={mine > theirs ? "is-won" : undefined}>
                    {mine}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Opp.</th>
                {pin.score.map(([mine, theirs], i) => (
                  <td key={i} className={theirs > mine ? "is-won" : undefined}>
                    {theirs}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="pin__cap">{pin.title}</p>
        </>
      );

    case "link":
      return (
        <>
          <p className="pin__kicker">{hostOf(pin.url)} ↗</p>
          <div className="pin__head">
            <Art art={pin.art} />
            <div>
              <h3 className="pin__title">{pin.title}</h3>
              {pin.author && <p className="pin__sub">{pin.author}</p>}
            </div>
          </div>
        </>
      );

    case "book":
      return (
        <div
          className={`pin__book${pin.cover?.motif ? ` pin__book--${pin.cover.motif}` : ""}`}
          style={
            pin.cover
              ? { "--book-bg": pin.cover.bg, "--book-fg": pin.cover.fg, "--book-sub": pin.cover.sub || pin.cover.fg }
              : undefined
          }
        >
          <span className="pin__book-t">{pin.title}</span>
          <span className="pin__book-a">{pin.author}</span>
        </div>
      );

    case "ticket":
      return (
        <div className={`pin__ticket${pin.theme === "dark" ? " pin__ticket--dark" : ""}`}>
          <div className="pin__ticket-main">
            <span className="pin__ticket-adm">Admit one{pin.number ? ` · ${pin.number}` : ""}</span>
            <span className="pin__ticket-t">{pin.title}</span>
            {pin.place && <span className="pin__ticket-p">{pin.place}</span>}
          </div>
          <div className="pin__ticket-stub">
            <span>{pinDate(pin.date)}</span>
          </div>
        </div>
      );

    case "note":
    default:
      return (
        <>
          <p className="pin__kicker">Note · {pinDate(pin.date)}</p>
          <h3 className="pin__title">{pin.title}</h3>
          <p className="pin__sub">{pin.caption}</p>
        </>
      );
  }
}
