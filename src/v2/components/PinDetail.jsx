import { useEffect, useRef } from "react";
import { PinBody, TYPE_LABEL, pinDate } from "./PinCard";

/* The story behind a pin. Same native-<dialog> approach as Lightbox:
   showModal() gives focus trapping, an inert page, Esc-to-close and focus
   return for free. `pin` is a pin object or null. */
export default function PinDetail({ pin, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    if (pin && !dialog.open) dialog.showModal();
    else if (!pin && dialog.open) dialog.close();
  }, [pin]);

  // Clicking the backdrop (the dialog element itself) dismisses.
  const handleClick = (event) => {
    if (event.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className="pin-detail"
      aria-labelledby="pin-detail-title"
      onClick={handleClick}
      onClose={onClose}
    >
      {pin && (
        <>
          <div className="pin-detail__visual">
            <div className={`pin pin--${pin.type}${pin.print === "cyan" ? " pin--print-cyan" : ""}`}>
              <PinBody pin={pin} />
            </div>
          </div>
          <div className="pin-detail__text">
            <p className="pin-detail__meta">
              {pin.kind || TYPE_LABEL[pin.type]} · {pinDate(pin.date)}
              {pin.place ? ` · ${pin.place}` : ""}
            </p>
            <h2 className="pin-detail__title" id="pin-detail-title">
              {pin.title}
            </h2>
            <p className="pin-detail__cap">{pin.caption}</p>
            {pin.story && <p className="pin-detail__story">{pin.story}</p>}
            {pin.type === "playlist" && (
              <ol className="pin__tracks pin__tracks--full">
                {pin.tracks.map(([title, artist], i) => (
                  <li key={`${i}-${title}`}>
                    <span>{title}</span>
                    <span>{artist}</span>
                  </li>
                ))}
              </ol>
            )}
            {pin.tags?.length > 0 && (
              <ul className="pin-detail__tags" aria-label="Tags">
                {pin.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            )}
            {pin.url && (
              <a className="btn btn--accent pin-detail__link" href={pin.url} target="_blank" rel="noopener noreferrer">
                {pin.type === "playlist" || /spotify\.com/.test(pin.url) ? "Listen" : "Open"} ↗
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <button className="pin-detail__close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </>
      )}
    </dialog>
  );
}
