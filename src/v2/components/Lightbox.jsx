import { useEffect, useRef } from "react";

/* Native <dialog> rather than a hand-rolled overlay: showModal() gives focus
   trapping, inertness of the page behind, Esc-to-close and the top layer for
   free. `item` is { src, caption } or null. */
export default function Lightbox({ item, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || typeof dialog.showModal !== "function") return;

    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  // A click can land on the dialog (the backdrop) or on the flex container's
  // empty space around the image — both dismiss. Never on the image itself.
  const handleClick = (event) => {
    const { target } = event;
    if (target === ref.current || target.classList.contains("lightbox__inner")) {
      onClose();
    }
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Screen viewer"
      onClick={handleClick}
      onClose={onClose}
    >
      <button className="lightbox__close btn" type="button" onClick={onClose}>
        Close ×
      </button>
      <div className="lightbox__inner">
        {item && <img src={item.src} alt={item.caption} />}
        <p className="lightbox__cap">
          <span>{item ? item.caption : ""}</span>
        </p>
      </div>
    </dialog>
  );
}
