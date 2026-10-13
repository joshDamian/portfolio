import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";
import ProjectDetail from "./pages/ProjectDetail";
// v2 is now the site; v1 is reachable under a version prefix. Both are driven
// by the constants below. See src/v2/README.md.
import { V2_BASE } from "./v2/config";
import { V1_BASE } from "./constants/paths";
import V2Layout from "./v2/V2Layout";
import V2Home from "./v2/pages/Home";
import V2About from "./v2/pages/About";
import V2Contact from "./v2/pages/Contact";
import V2Projects from "./v2/pages/Projects";
import V2ProjectDetail from "./v2/pages/ProjectDetail";
import V2Pinboard from "./v2/pages/Pinboard";

AOS.init();

function App() {
  return (
    <div>
      {/* Both versions share it: a new route should start at the top. */}
      <ScrollToTop />
      <Routes>
        {/* v1 — kept reachable under /v1. */}
        <Route path={V1_BASE} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
        </Route>

        {/* v2 — the canonical site. V2_BASE is "" today, so this is "/". */}
        <Route path={V2_BASE || "/"} element={<V2Layout />}>
          <Route index element={<V2Home />} />
          <Route path="about" element={<V2About />} />
          <Route path="contact" element={<V2Contact />} />
          <Route path="projects" element={<V2Projects />} />
          <Route path="projects/:id" element={<V2ProjectDetail />} />
          <Route path="pinboard" element={<V2Pinboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
