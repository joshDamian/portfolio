import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/* React Router v6 has no built-in scroll restoration: a route change swaps the
   <Outlet> and leaves the window exactly where it was, so a new page opens
   mid-scroll at the previous page's offset. Reset to the top on a fresh
   navigation.

   Two deliberate exceptions:

     - A hash (/about#contact) is an in-page jump; let the browser honour it
       rather than snapping to the top and swallowing the anchor.
     - POP is Back/Forward. There the browser restores the previous offset for
       us, and forcing 0 would fight that. */

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) return;
    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}
