import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projects from "../../data/projects.json";
import { v2Routes } from "../config";
import { asset, captionFor, gallerySpan, showcaseOf, yearOf } from "../lib/format";
import { cardSize, gallerySize } from "../data/imageSizes";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);
  const [active, setActive] = useState(null);

  // Landing on a different case study must not leave the previous lightbox open.
  useEffect(() => {
    setActive(null);
  }, [id]);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${project.name} · Joshua Avoaja`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) {
    return (
      <section className="section wrap">
        <span className="eyebrow">Not found</span>
        <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
          No such project
        </h1>
        <p className="lead" style={{ marginTop: "var(--s4)" }}>
          Nothing here matches {id ? <code>{id}</code> : "that link"}. Try the{" "}
          <Link to={v2Routes.projects} style={{ color: "var(--accent)" }}>
            projects index
          </Link>
          .
        </p>
      </section>
    );
  }

  const cover = asset(project.image);
  const diagrams = (project.diagrams || []).map((item) => ({ ...item, src: asset(item.src) }));
  let images = showcaseOf(project);
  // shiga-digital repeats its cover as the first showcase entry — skip it.
  if (images.length && images[0] === cover) images = images.slice(1);

  const caseStudies = projects.filter((item) => item.id);
  const at = caseStudies.indexOf(project);
  const previous = caseStudies[(at - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(at + 1) % caseStudies.length];

  return (
    <>
      <section className="wrap" style={{ paddingTop: "var(--s7)" }}>
        <p style={{ margin: "0 0 var(--s4)" }}>
          <Link className="navlink" to={v2Routes.projects}>
            ← All projects
          </Link>
        </p>

        <div className="case__cover">
          {/* Intrinsic ratio is set by the CSS box, so no width/height here —
              this one is above the fold and should not be lazy. */}
          <img src={cover} alt={`${project.name} cover`} fetchpriority="high" decoding="async" />
        </div>

        <div className="case__head">
          <span className="eyebrow">{project.timestamp}</span>
          <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
            {project.name}
          </h1>
          <p className="lead" style={{ marginTop: "var(--s5)" }}>
            {project.description}
          </p>
          {/* A case study usually lives in-app, but Bench's is a public repo.
              External links say so, like the cards do. */}
          {project.url && project.linkIsExternal && (
            <p style={{ marginTop: "var(--s4)" }}>
              <a
                className="btn"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repository ↗
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          )}
          <dl className="meta">
            <div className="meta__item">
              <dt className="meta__k">Year</dt>
              <dd className="meta__v">{yearOf(project.timestamp)}</dd>
            </div>
            <div className="meta__item">
              <dt className="meta__k">Screens</dt>
              <dd className="meta__v">{images.length}</dd>
            </div>
            <div className="meta__item">
              <dt className="meta__k">Role</dt>
              {/* Per-project, defaulting to what every earlier case study
                  shipped as. Bench was built solo. */}
              <dd className="meta__v">{project.role || "Development lead"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Only Bench has these so far, so it is opt-in per project rather than a
          section every case study grows. Two levels of the C4 model: the
          containers, then the components inside the API server. */}
      {diagrams.length > 0 && (
        <Reveal className="section wrap">
          <h2 className="h2">How it&rsquo;s built</h2>
          <p className="muted" style={{ fontSize: "var(--step--1)", marginTop: "var(--s2)" }}>
            Bench runs as one Node process that holds the database, the Claude
            sessions, the git work and the terminals. Browsers only talk to it.
            Both diagrams use the C4 model; select one to see it full size.
          </p>
          <div className="diagram">
            {diagrams.map((item) => (
              <figure key={item.src}>
                <button
                  className="thumb"
                  type="button"
                  onClick={() => setActive({ src: item.src, caption: item.caption })}
                  aria-label={`View the ${item.caption.toLowerCase()} full size`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={cardSize(item.src)[0]}
                    height={cardSize(item.src)[1]}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <figcaption>
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="section wrap">
        <h2 className="h2">Screens</h2>
        <p
          className="muted"
          style={{ fontSize: "var(--step--1)", marginTop: "var(--s2)" }}
        >
          Select any screen to view it full size.
        </p>

        <div className="gallery">
          {images.map((src, index) => {
            const caption = captionFor(src);
            const [width, height] = gallerySize(src);
            const span = gallerySpan(src, [width, height]);
            return (
              <figure key={src} className={span || undefined}>
                <button
                  className="thumb"
                  type="button"
                  onClick={() => setActive({ src, caption })}
                  aria-label={`View ${caption} full size`}
                >
                  {/* Measured dimensions reserve the box before decode, so the
                      gallery does not reflow as each screenshot arrives. */}
                  <img
                    src={src}
                    alt={caption}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <figcaption>
                  <span>{caption}</span>
                  <span className="fig-num">{String(index + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Reveal>

      {/* Explicit aria-labels: two flex children produce no whitespace in the
          text alternative, so this otherwise reads as "PreviousPlotpeer". */}
      <nav className="pager wrap" aria-label="More case studies">
        <Link to={v2Routes.caseStudy(previous.id)} aria-label={`Previous case study: ${previous.name}`}>
          <span className="pager__dir" aria-hidden="true">
            ← Previous
          </span>
          <span className="pager__name">{previous.name}</span>
        </Link>
        <Link
          className="pager__next"
          to={v2Routes.caseStudy(next.id)}
          aria-label={`Next case study: ${next.name}`}
        >
          <span className="pager__dir" aria-hidden="true">
            Next →
          </span>
          <span className="pager__name">{next.name}</span>
        </Link>
      </nav>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
