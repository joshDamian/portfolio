import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faBriefcase, faChalkboardTeacher, faCheck, faCopy, faCubes, faEnvelope, faFlask, faGraduationCap, faHandsHelping, faHandshake, faLaptop, faLaptopCode, faLightbulb, faMusic, faPalette, faPeopleGroup, faRocket, faThumbsUp, faUpRightFromSquare, faUserCheck, faUserCog, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import ActivityCard from "../components/Activity";
import { MY_EMAIL } from "../constants/strings";
import React from "react";
import { copyToClipboard } from "../utils/clipboard";

const experience = [
  {
    role: "Co-Founder & CTO",
    company: "UseAzza",
    period: "Jan 2025 – Present",
    description: (
      <div>
        <div>
          Building{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-blue-400"
            href="https://www.useazza.com"
          >
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="mr-1.5"
            />
            Azza
          </a>
          , a stablecoin bank for everyday people.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Lead the product and engineering of Azza Bot: $10M+ in on-chain volume across 9+ blockchains, and 13k+ users."
              }
              icon={faLaptop}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Run growth campaigns to bring in new users and reach new markets."
              }
              icon={faPeopleGroup}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Ship early, learn from what doesn't work, and adjust the product."
              }
              icon={faFlask}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Make paying with Azza simple, and pleasant to use."
              }
              icon={faThumbsUp}
            />
          </li>
        </ul>
      </div>
    ),
  },
  {
    role: "Lead Software Developer",
    company: "Blocverse",
    period: "Mar 2022 - Present",
    description: (
      <div>
        <div>
          Making it easier for people to get started with Web3.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={"Lead the development team."}
              icon={faPeopleGroup}
            />
          </li>
          <li>
            <ActivityCard
              icon={faFlask}
              activity={"Make mistakes early and learn from them."}
            />
          </li>
          <li>
            <ActivityCard
              icon={faThumbsUp}
              activity={"Deliver software clients are happy with."}
            />
          </li>
          <li>
            <ActivityCard
              icon={faPalette}
              activity={"Push for designing before building."}
            />
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
          Three months of design thinking, meeting people and hearing other
          points of view. The best three months of my 2022.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Took part in design-thinking sessions with other founders."
              }
              icon={faUsersGear}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Learned to start from the user's problem."
              }
              icon={faUserCheck}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Met industry experts and investors."}
              icon={faHandshake}
            />
          </li>
        </ul>
      </div>
    ),
    icon: <FontAwesomeIcon icon={faLightbulb} />,
  },
  {
    role: "Fullstack Developer",
    company: "Blocverse",
    period: "Jul 2021 - Feb 2022",
    description: (
      <div>
        Building Web3 apps with the dev team at{" "}
        <a
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
          href="https://blocverse.com"
        >
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            className="mr-1.5"
          />
          Blocverse
        </a>
        .
        <ul className="activity-group">
          <li>
            <ActivityCard
              icon={faCubes}
              activity={"Built prototypes and MVPs for clients."}
            />
          </li>
          <li>
            <ActivityCard
              icon={faChalkboardTeacher}
              activity={
                "Led the development of the Blocverse education platform."
              }
              linkHref={"https://blog.blocverse.com"}
              linkTitle={"Blocverse Blog"}
            />
          </li>
          <li>
            <ActivityCard
              icon={faMusic}
              activity={"Designed a token-gated music platform for artists."}
              linkHref={"https://africanvaluables.com"}
              linkTitle={"African Valuables"}
            />
          </li>
          <li>
            <ActivityCard
              icon={faGraduationCap}
              activity={"Learned the basics of Web3 development."}
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
          A social-commerce startup. I built a store-management system for
          people selling on social media. It got some users, but we shut it
          down. It was the first thing I built that people used.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Tried a wide range of technology, from bare metal to frameworks."
              }
              icon={faBrain}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Got my first experience of building a company."}
              icon={faUserCog}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Got hooked on web development."}
              icon={faLaptopCode}
            />
          </li>
        </ul>
      </div>
    ),
    icon: <FontAwesomeIcon icon={faRocket} />,
  },
  {
    role: "Community Member",
    company:
      "Google Developer Student's Club, Alex-Ekwueme Federal University Ndufu-Alike",
    period: "Oct 2020 - 2023",
    description: (
      <div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={"Ran a six-week dev and design bootcamp."}
              icon={faChalkboardTeacher}
            />
          </li>
          <li>
            <ActivityCard
              icon={faHandsHelping}
              activity={
                "Shared resources and helped other members."
              }
            />
          </li>
        </ul>
      </div>
    ),
    icon: <FontAwesomeIcon icon={faPeopleGroup} />,
  },
];

export default function About() {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    setIsCopied(await copyToClipboard(MY_EMAIL));
  };

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <div
      data-aos="fade-right"
      className="md:px-16 bg-gray-900 pt-5 md:pt-20 pb-9 md:pb-20"
    >
      <div className="mx-auto">
        <h3 className="text-white sm:px-6 px-5 md:px-0 md:text-center font-black uppercase mb-5 md:mb-20 text-3xl md:text-[3.6rem]">
          <span className="text-portfolio-skyblue">About</span>
        </h3>
        <hr className="border-slate-600 w-full md:max-w-[calc(100%-96px)] md:mx-auto" />
        <div
          className={
            "mt-12 md:mt-16 flex flex-col gap-6 w-fit mx-auto mb-16 sm:pl-10 sm:pr-6 md:px-12"
          }
        >
          <h4 className="uppercase sm:px-6 px-5 md:px-0 md:text-left text-white text-xl md:text-[1.7rem] font-semibold">
            Me
          </h4>
          <div
            className={
              "flex flex-col gap-7 sm:px-6 px-5 md:px-0 text-white leading-loose w-fit mx-auto"
            }
          >
            <p>
              I’m a software developer. I’ve wanted to know how things work for
              as long as I can remember, and I like building tools that make
              everyday life a little easier. I design first: I work out how
              something should feel to use, then build it. I’m still learning all
              the time.
            </p>
            <p>
              I’m interested in systems, in software and outside it. Most things
              run on rules you can learn, and once you understand them you can
              change them. Software is how I try to make the way we live and work
              run a bit better.
            </p>
          </div>
        </div>
        <hr className="border-slate-600 w-full md:max-w-[calc(100%-96px)] md:mx-auto" />
        <h4 className="uppercase mt-12 md:mt-16 sm:px-6 px-5 md:px-12 md:text-left text-white text-xl md:text-[1.7rem] font-semibold">
          Career Milestones
        </h4>
        <div className="grid grid-cols-1 mt-14 mb-16 pl-9 pr-5 sm:pl-10 sm:pr-6 md:px-16 gap-16 lg:gap-20 md:grid-cols-2">
          {experience.map((item) => {
            return (
              <div className="flex relative items-start border-l border-slate-200">
                <div className="-mt-[10px] absolute left-[-22.5px]">
                  <div className="h-[45px] w-[45px] text-[18px] rounded-full text-white bg-portfolio-skyblue flex items-center justify-center">
                    {item.icon ? (
                      item.icon
                    ) : (
                      <FontAwesomeIcon icon={faBriefcase} />
                    )}
                  </div>
                </div>
                <div className="text-white ml-[40px]">
                  <h3 className="bg-gray-800 inline rounded-full px-3 py-2 text-slate-200 font-medium">
                    {item.period}
                  </h3>
                  <h3 className="uppercase tracking-wide mt-6 font-semibold">
                    {item.role}{" "}
                    <span className="text-slate-300"> - {item.company}</span>
                  </h3>
                  <p className="mt-6 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="border-slate-600 w-full md:max-w-[calc(100%-96px)] md:mx-auto" />
        <div
          className={
            "mt-12 md:mt-16 flex flex-col gap-7 w-full mb-16 sm:pl-10 sm:pr-6 md:px-12"
          }
        >
          <h4 className="uppercase sm:px-6 px-5 md:px-0 md:text-left text-white text-xl md:text-[1.7rem] font-semibold">
            Contact
          </h4>
          <div
            className={
              "flex flex-col sm:px-6 px-5 md:px-0 gap-5 text-white w-full mx-auto"
            }
          >
            <div
              className={
                "flex flex-col gap-4 sm:flex-row justify-between items-start"
              }
            >
              <div className={"flex flex-col gap-1.5"}>
                <span className={"font-medium"}>Email</span>
                <span className={"text-white/60 text-sm"}>{MY_EMAIL}</span>
              </div>
              <div
                className={
                  "flex border text-sm border-portfolio-skyblue/70 rounded"
                }
              >
                <a
                  target={"_blank"}
                  rel={"noreferrer"}
                  href={`mailto:${MY_EMAIL}`}
                  className={
                    "flex p-3 border-r border-portfolio-skyblue/70 items-center gap-1.5"
                  }
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Send me an email</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className={"p-3 flex items-center gap-1.5"}
                >
                  <FontAwesomeIcon
                    icon={isCopied ? faCheck : faCopy}
                  />
                  <span>{isCopied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
