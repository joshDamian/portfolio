import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "react-circular-progressbar/dist/styles.css";
import ActivityCard from "./components/Activity";
import projects from "./data/projects";

const experience = [
    {
        role: "Lead Software Developer",
        company: "Blocverse",
        period: "Mar 2022 - Present",
        description: (
            <div>
                <div>Contributing my efforts to make Web3 onboarding easier and smooth.</div>
                <ul className="activity-group">
                    <li>
                        <ActivityCard
                            activity={"Leading the development team at Blocverse."}
                            icon={solid('people-group')}
                        />
                    </li>
                    <li>
                        <ActivityCard icon={solid('flask')} activity={"Failing early and learning from my mistakes."}/>
                    </li>
                    <li>
                        <ActivityCard icon={solid('thumbs-up')} activity={"Delivering software that meets client's satisfaction."}/>
                    </li>
                    <li>
                        <ActivityCard icon={solid('palette')} activity={"Championing design-driven development."}/>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        role: "Entrepreneur",
        company: "Antler",
        period: "Oct 2022 - Dec 2022",
        description: (
            <div>
                <div>
                    3 months of design-thinking experiences, networking and getting diverse perspectives. Best 3 months of 2022.
                </div>
                <ul className="activity-group">
                    <li>
                        <ActivityCard
                            activity={"Engaged in design-thinking sessions with a diverse group of entrepreneurs."}
                            icon={solid('users-gear')}
                        />
                    </li>
                    <li>
                        <ActivityCard activity={"Gained insight on the importance of user-centric problem solving."} icon={solid('user-check')}/>
                    </li>
                    <li>
                        <ActivityCard activity={"Networked with industry experts and investors."} icon={solid("handshake")}/>
                    </li>
                </ul>
            </div>
        ),
        icon: <FontAwesomeIcon icon={solid("lightbulb")} />,
    },
    {
        role: "Fullstack Developer",
        company: "Blocverse",
        period: "Jul 2021 - Feb 2022",
        description: (
            <div>
                Building Web3 powered applications with the Dev team at{" "}
                <a target="_blank" rel="noreferrer" className="text-blue-400" href="https://blocverse.com">
                    <FontAwesomeIcon icon={solid("up-right-from-square")} className="mr-1.5" />
                    Blocverse
                </a>
                .
                <ul className="activity-group">
                    <li>
                        <ActivityCard
                            icon={solid('cubes')}
                            activity={"Built concept products and MVPs for clients."}
                        />
                    </li>
                    <li>
                        <ActivityCard
                            icon={solid('chalkboard-teacher')}
                            activity={"Led the development of the Blocverse education platform. now,"}
                            linkHref={"https://blog.blocverse.com"}
                            linkTitle={"Blocverse Blog"}
                        />
                    </li>
                    <li>
                        <ActivityCard
                            icon={solid('music')}
                            activity={"Architected a token-gated music platform for artists."}
                            linkHref={"https://africanvaluables.com"}
                            linkTitle={"African Valuables"}
                        />
                    </li>
                    <li>
                        <ActivityCard
                            icon={solid('graduation-cap')}
                            activity={"Learnt the ropes of Web3 development."}
                        />
                    </li>
                </ul>
            </div>
        ),
    },
    {
        role: "Fullstack Developer/Co-founder",
        company: "Ecorun",
        period: "Jul 2020 - Mar 2021",
        description: (
            <div>
                <div>
                    Targeted the social-commerce market. Built a social-store management system. Got some users and engagement but ultimately closed it down. My first rodeo at building anything people used.
                </div>
                <ul className="activity-group">
                    <li>
                        <ActivityCard
                            activity={"Explored a wide range of technologies, from bare-metal to frameworks."}
                            icon={solid('brain')}
                        />
                    </li>
                    <li>
                        <ActivityCard activity={"Gained my first experience with building a venture."} icon={solid('user-cog')}/>
                    </li>
                    <li>
                        <ActivityCard activity={"Developed keen interests in web development."} icon={solid("laptop-code")}/>
                    </li>
                </ul>
            </div>
        ),
        icon: <FontAwesomeIcon icon={solid("rocket")} />,
    },
    {
        role: "Community Member",
        company: "Google Developer Student's Club, Alex-Ekwueme Federal University Ndufu-Alike",
        period: "Oct 2020 - 2023",
        description: (
            <div>
                <ul className="activity-group">
                    <li>
                        <ActivityCard
                            activity={"Facilitated a six-week Dev/Design bootcamp."}
                            icon={solid('chalkboard-teacher')}
                        />
                    </li>
                    <li>
                        <ActivityCard icon={solid('hands-helping')} activity={"Contributed resources and guidance to community members."} />
                    </li>
                </ul>
            </div>
        ),
        icon: <FontAwesomeIcon icon={solid("people-group")} />,
    },
];

export default function About() {
  return (
    <div data-aos="fade-right" className="md:px-16 bg-gray-900 pt-5 md:pt-20 pb-9 md:pb-20">
        <div className="mx-auto">
            <h3 className="text-white sm:px-6 px-5 md:px-0 md:text-center font-black uppercase mb-5 md:mb-20 text-3xl md:text-[3.6rem]">
                About <span className="text-portfolio-skyblue">Me</span>
            </h3>
            <hr className="border-slate-600 w-full md:max-w-[70%] md:mx-auto"/>
            <h4 className="uppercase mt-12 md:mt-12 sm:px-6 px-5 md:px-0 md:text-center text-white text-xl md:text-[1.7rem] font-semibold">
                Career Milestones
            </h4>
            <div
                className="grid grid-cols-1 mt-14 mb-24 pl-9 pr-5 sm:pl-10 sm:pr-6 md:px-16 gap-16 lg:gap-20 md:grid-cols-2">
                {experience.map((item) => {
                    return (
                        <div className="flex relative items-start border-l border-slate-200">
                            <div className="-mt-[10px] absolute left-[-22.5px]">
                                <div
                                    className="h-[45px] w-[45px] text-[18px] rounded-full text-white bg-portfolio-skyblue flex items-center justify-center">
                                    {item.icon ? item.icon : <FontAwesomeIcon icon={solid("briefcase")}/>}
                                </div>
                            </div>
                            <div className="text-white ml-[40px]">
                                <h3 className="bg-gray-800 inline rounded-full px-3 py-2 text-slate-200 font-medium">
                                    {item.period}
                                </h3>
                                <h3 className="uppercase tracking-wide mt-6 font-semibold">
                                    {item.role} <span className="text-slate-300"> - {item.company}</span>
                                </h3>
                                <p className="mt-6 text-sm">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr className="border-slate-600 md:max-w-[70%] md:mx-auto"/>
            <h4 className="uppercase mt-12 md:mt-12 px-5 sm:px-6 md:px-16 md:text-center text-white text-2xl md:text-[1.7rem] font-semibold">
                My Explorations
            </h4>
            <div className={'flex flex-col mt-14 mb-24 px-5 md:px-16 gap-8 md:gap-10'}>
                {projects.map((project) => (
                    <div key={project.name} className={'flex gap-5'}>
                        <span className={'shrink-0 text-white/70 pt-8'}>{project.timestamp}</span>
                        <a target={project.linkIsExternal ? '_blank' : '_self'} rel={project.linkIsExternal ? 'noreferrer' : 'prev'} href={project.url}
                           className={'rounded-2xl group border-slate-600 flex flex-col gap-6 border'}>
                            <img src={project.image} className={'rounded-t-2xl'} alt={project.name}/>
                            <div className={'px-6 pb-6 flex-col flex gap-4'}>
                                <div className={'flex gap-1.5 items-center'}>
                                    <h4 className={'font-medium text-white text-xl'}>{project.name}</h4>
                                    {project.linkIsExternal && (
                                        <FontAwesomeIcon icon={solid('external-link-alt')} className={'text-white/70 hidden group-hover:inline'}/>
                                    )}
                                </div>
                                <p className={'text-white/75'}>{project.description}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
