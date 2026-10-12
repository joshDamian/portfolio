import { Link } from "react-router-dom";
import { asset, projectHref } from "../lib/format";
import { cardSize } from "../data/imageSizes";

export const ArrowNE = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3 9L9 3M9 3H4.5M9 3v4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowR = () => (
  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProjectCard({ project }) {
  const isCaseStudy = Boolean(project.id);
  const src = asset(project.image);
  const [width, height] = cardSize(src);

  return (
    <article className="card">
      <span className="card__kind">{isCaseStudy ? "Case study" : "Live site"}</span>
      <div className="card__media">
        {/* width/height are the measured intrinsic size — v1 sets none, so
            its cards reflow as each image decodes. */}
        <img
          src={src}
          alt={project.name}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">
          {isCaseStudy ? (
            /* Router Link for internal targets — v1 renders these as raw
               <a href>, which reloads the whole app to change a route. */
            <Link className="card__link" to={projectHref(project)}>
              {project.name}
            </Link>
          ) : (
            <a
              className="card__link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </h3>
        <p className="card__desc">{project.description}</p>
        <span className="card__cta">
          {isCaseStudy ? (
            <>
              Read case study <ArrowR />
            </>
          ) : (
            <>
              Visit site <ArrowNE />
            </>
          )}
        </span>
      </div>
    </article>
  );
}
