import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
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
              icon={solid("up-right-from-square")}
              className="mr-1.5"
            />
            Azza
          </a>{" "}
          — the most accessible stablecoin bank for everyday people.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Driving the vision and engineering of Azza Bot — powering $5M+ in on-chain volume across 9+ blockchains, trusted by 6k+ users and counting."
              }
              icon={solid("laptop")}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Spearheading growth campaigns that turn ideas into traction, fueling adoption and opening doors in new markets."
              }
              icon={solid("people-group")}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Failing fast, learning faster — using every misstep as momentum to sharpen our product and strategy."
              }
              icon={solid("flask")}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Crafting experiences people actually enjoy spending money through — where finance feels effortless, even fun."
              }
              icon={solid("thumbs-up")}
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
          Contributing my efforts to make Web3 onboarding easier and smooth.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={"Leading the development team at Blocverse."}
              icon={solid("people-group")}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("flask")}
              activity={"Failing early and learning from my mistakes."}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("thumbs-up")}
              activity={"Delivering software that meets client's satisfaction."}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("palette")}
              activity={"Championing design-driven development."}
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
          3 months of design-thinking experiences, networking and getting
          diverse perspectives. Best 3 months of 2022.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Engaged in design-thinking sessions with a diverse group of entrepreneurs."
              }
              icon={solid("users-gear")}
            />
          </li>
          <li>
            <ActivityCard
              activity={
                "Gained insight on the importance of user-centric problem solving."
              }
              icon={solid("user-check")}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Networked with industry experts and investors."}
              icon={solid("handshake")}
            />
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
        <a
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
          href="https://blocverse.com"
        >
          <FontAwesomeIcon
            icon={solid("up-right-from-square")}
            className="mr-1.5"
          />
          Blocverse
        </a>
        .
        <ul className="activity-group">
          <li>
            <ActivityCard
              icon={solid("cubes")}
              activity={"Built concept products and MVPs for clients."}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("chalkboard-teacher")}
              activity={
                "Led the development of the Blocverse education platform. now,"
              }
              linkHref={"https://blog.blocverse.com"}
              linkTitle={"Blocverse Blog"}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("music")}
              activity={"Architected a token-gated music platform for artists."}
              linkHref={"https://africanvaluables.com"}
              linkTitle={"African Valuables"}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("graduation-cap")}
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
          Targeted the social-commerce market. Built a social-store management
          system. Got some users and engagement but ultimately closed it down.
          My first rodeo at building anything people used.
        </div>
        <ul className="activity-group">
          <li>
            <ActivityCard
              activity={
                "Explored a wide range of technologies, from bare-metal to frameworks."
              }
              icon={solid("brain")}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Gained my first experience with building a venture."}
              icon={solid("user-cog")}
            />
          </li>
          <li>
            <ActivityCard
              activity={"Developed keen interests in web development."}
              icon={solid("laptop-code")}
            />
          </li>
        </ul>
      </div>
    ),
    icon: <FontAwesomeIcon icon={solid("rocket")} />,
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
              activity={"Facilitated a six-week Dev/Design bootcamp."}
              icon={solid("chalkboard-teacher")}
            />
          </li>
          <li>
            <ActivityCard
              icon={solid("hands-helping")}
              activity={
                "Contributed resources and guidance to community members."
              }
            />
          </li>
        </ul>
      </div>
    ),
    icon: <FontAwesomeIcon icon={solid("people-group")} />,
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
              I’m a software developer driven by a deep curiosity for technology
              and a desire to create meaningful experiences through
              design-driven development. From a young age, I’ve been fascinated
              by how things work and how we can continually improve the tools we
              build to make life more efficient and enjoyable. This curiosity
              has shaped my approach to software—constantly learning, growing,
              and seeking new ways to push boundaries.
            </p>
            <p>
              At the core of my work is a passion for understanding systems,
              both technological and universal. I believe that every aspect of
              the world is governed by underlying systems, and mastering them is
              the key to unlocking greater potential. For me, software
              development is about more than just building products; it’s about
              exploring how we can optimise the way we live and interact with
              the world.
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
                      <FontAwesomeIcon icon={solid("briefcase")} />
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
                  <FontAwesomeIcon icon={solid("envelope")} />
                  <span>Send me an email</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className={"p-3 flex items-center gap-1.5"}
                >
                  <FontAwesomeIcon
                    icon={isCopied ? solid("check") : solid("copy")}
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
