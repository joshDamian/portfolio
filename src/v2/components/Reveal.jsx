import { useEffect, useRef, useState } from "react";

/* Reveals content as it scrolls into view.

   Deliberately unlike v1's AOS: v1 wraps whole page subtrees in data-aos and
   re-inits globally, and animates for a fixed duration regardless of user
   preference. Here the element is unobserved once shown, and reduced-motion
   users get the content immediately with no transform at all. */
export default function Reveal({ as: Tag = "section", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal${shown ? " is-in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
