import React from "react";
import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div
      data-aos="fade-right"
      className="md:px-16 px-5 bg-gray-900 pt-5 md:pt-20 pb-9 md:pb-20 flex flex-col gap-14"
    >
      <section className={"flex justify-between"}>
        <div className={"flex flex-col gap-6"}>
          <h1 className={"text-white text-2xl font-semibold"}>
            {project.name}
          </h1>
          <p className={"text-white/75"}>{project.description}</p>
        </div>
        <p className={"shrink-0 text-white/70"}>{project.timestamp}</p>
      </section>
      <section className={"flex flex-col gap-8"}>
        {project.showcase.map((image) => (
          <img
            className={"rounded-2xl shadow-xl"}
            src={`${project.mediaFolder}${image}`}
            alt={project.name}
          />
        ))}
      </section>
      <Link
        to={"/projects"}
        className={
          "text-portfolio-skyblue flex gap-3 items-center border-portfolio-skyblue py-2 px-3"
        }
      >
        <FontAwesomeIcon icon={solid("arrow-left")} />
        <span>Other Projects</span>
      </Link>
    </div>
  );
}
