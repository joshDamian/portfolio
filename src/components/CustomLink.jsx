import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { V1_BASE } from "../constants/paths";

export default function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const currentPath = window.location.pathname;

  /* Fallback so a nested route (/v1/projects/:id) still highlights Projects.
     Skipped for v1's home link — /v1 is a prefix of every v1 path, so the
     naive test would mark Home current everywhere. The trailing slash also
     stops /v1/projects from matching /v1/projects-archive. */
  if (!match && to !== V1_BASE && currentPath.startsWith(`${to}/`)) {
    match = true;
  }

  return (
    <Link
      style={{
        backgroundImage: match
          ? "linear-gradient(315deg, #1b2845 0%, #274060 74%)"
          : "none",
        backgroundColor: match ? "#1b2845" : "",
        color: match ? "white" : "",
      }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
