import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import projects from "../data/projects";

export default function Projects() {
  return (
    <div
      data-aos="fade-right"
      className="md:px-16 bg-gray-900 pt-5 md:pt-20 pb-9 md:pb-20"
    >
      <div className="mx-auto">
        <h3 className="text-white sm:px-6 px-5 md:px-0 md:text-center font-black uppercase mb-5 md:mb-20 text-3xl md:text-[3.6rem]">
          My <span className="text-portfolio-skyblue">Explorations</span>
        </h3>
        <hr className="border-slate-600 w-full md:max-w-[70%] md:mx-auto" />
        <div
          className={"flex flex-col mt-14 mb-24 px-5 md:px-16 gap-8 md:gap-10"}
        >
          {projects.map((project) => (
            <div key={project.name} className={"flex gap-5"}>
              <span className={"shrink-0 text-white/70 pt-8"}>
                {project.timestamp}
              </span>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                target={project.linkIsExternal ? "_blank" : "_self"}
                rel={project.linkIsExternal ? "noreferrer" : "prev"}
                href={project.url}
                className={
                  "rounded-2xl group border-slate-600 flex flex-col gap-6 border"
                }
              >
                <img
                  src={project.image}
                  className={"rounded-t-2xl"}
                  alt={project.name}
                />
                <div className={"px-6 pb-6 flex-col flex gap-4"}>
                  <div className={"flex gap-1.5 items-center"}>
                    <h4 className={"font-medium text-white text-xl"}>
                      {project.name}
                    </h4>
                    {project.linkIsExternal && (
                      <FontAwesomeIcon
                        icon={solid("external-link-alt")}
                        className={"text-white/70 hidden group-hover:inline"}
                      />
                    )}
                  </div>
                  <p className={"text-white/75"}>{project.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
