import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const currentPath = window.location.pathname;

  if (!match && to !== "/" && currentPath.startsWith(to)) {
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
