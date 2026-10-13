import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { v2Routes } from "./config";
import { MY_EMAIL } from "../constants/strings";
import "./v2.css";

const NAV = [
  { to: v2Routes.home, label: "Home", end: true },
  { to: v2Routes.projects, label: "Projects" },
  { to: v2Routes.about, label: "About" },
  { to: v2Routes.contact, label: "Contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dev-josh/" },
  { label: "GitHub", href: "https://www.github.com/joshDamian" },
  { label: "Twitter", href: "https://twitter.com/DevJosh__" },
];

export default function V2Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Collapse the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="v2-root">
      <a className="skip-link" href="#v2-main">
        Skip to content
      </a>

      <header className="nav">
        <div className="nav__inner">
          <NavLink className="brand" to={v2Routes.home}>
            Joshua Avoaja
          </NavLink>

          <button
            className="nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="v2-nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav
            className="nav__links"
            id="v2-nav-links"
            data-open={menuOpen ? "true" : "false"}
            aria-label="Primary"
          >
            {/* NavLink sets aria-current="page" itself, and partial-matches, so
                Projects stays current on /projects/:id. */}
            {NAV.map((item) => (
              <NavLink key={item.label} className="navlink" to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="v2-main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__inner">
            <NavLink className="brand" to={v2Routes.home}>
              Joshua Avoaja
            </NavLink>
            <nav className="footer__links" aria-label="Elsewhere">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
              <a href={`mailto:${MY_EMAIL}`}>Email</a>
            </nav>
          </div>
          <div className="footer__note">
            <span>Software developer — Nigeria</span>
            <span className="footer__meta">
              <a href={`mailto:${MY_EMAIL}`}>{MY_EMAIL}</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
