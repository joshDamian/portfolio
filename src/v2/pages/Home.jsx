import { Link } from "react-router-dom";
import projects from "../../data/projects.json";
import { v2Routes } from "../config";
import Reveal from "../components/Reveal";
import ProjectCard, { ArrowR } from "../components/ProjectCard";

export default function Home() {
  const recent = projects.slice(0, 3);

  return (
    <>
      <section className="hero wrap">
        <span className="eyebrow">Software developer</span>
        {/* The space after <br /> is load-bearing: without it the text
            alternative reads "Hi, I'm Josh.I build..." — a line break
            contributes no whitespace. */}
        <h1 className="display">
          Hi, I&apos;m Josh.
          <br /> I build software people actually use.
        </h1>
        <p className="lead" style={{ marginTop: "var(--s5)" }}>
          Design-driven development, and a long-running interest in how systems
          work. Currently building stablecoin infrastructure for everyday people.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--accent" to={v2Routes.projects}>
            View projects <ArrowR />
          </Link>
          <Link className="btn" to={v2Routes.about}>
            More about me
          </Link>
        </div>
        <p className="hero__now">
          <span className="hero__pulse" aria-hidden="true" />
          Co-Founder &amp; CTO at UseAzza
        </p>
      </section>

      <Reveal className="section wrap">
        <div className="section-head">
          <h2 className="h2">Recent work</h2>
          <Link className="navlink" to={v2Routes.projects}>
            All projects →
          </Link>
        </div>
        <div className="cards" style={{ marginTop: "var(--s5)" }}>
          {recent.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Reveal>
    </>
  );
}
