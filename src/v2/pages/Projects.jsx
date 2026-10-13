import { useState } from "react";
import projects from "../../data/projects.json";
import { yearOf, yearsOf } from "../lib/format";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const years = yearsOf(projects);
  const caseCount = projects.filter((project) => project.id).length;

  const groups = years.map((year) => ({
    year,
    items: projects.filter((project) => yearOf(project.timestamp) === year),
  }));

  const shown = groups.reduce(
    (total, group) => (filter === "all" || filter === group.year ? total + group.items.length : total),
    0
  );

  return (
    <>
      <header className="section section--tight wrap">
        <span className="eyebrow">Selected work</span>
        <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
          Projects
        </h1>
        <p className="lead" style={{ marginTop: "var(--s4)" }}>
          {projects.length} projects from {years[years.length - 1]} to {years[0]}.{" "}
          {caseCount} have a full case study; the rest link to the live site.
        </p>

        {/* A filter is a group of toggle buttons, not a set of links, so
            aria-pressed is the honest state — v1 has no filter at all. */}
        <div className="chiprow" role="group" aria-label="Filter projects by year">
          <button
            className="chip"
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              className="chip"
              type="button"
              aria-pressed={filter === year}
              onClick={() => setFilter(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <p className="muted" role="status" style={{ marginTop: "var(--s4)", fontSize: "var(--step--1)" }}>
          {filter === "all"
            ? `Showing all ${shown} projects`
            : `Showing ${shown} projects from ${filter}`}
        </p>
      </header>

      <div className="wrap">
        {groups.map((group) => {
          const hidden = filter !== "all" && filter !== group.year;
          return (
            <section className="yeargroup" key={group.year} hidden={hidden}>
              <h2 className="rail">{group.year}</h2>
              <div className="cards">
                {group.items.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
