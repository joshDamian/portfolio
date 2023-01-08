import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ActivityCard from "./components/Activity";
export default function About() {
  const experience = [
    {
      role: "Fullstack Developer",
      company: "Blocverse",
      period: "Jul 2021 - PRESENT",
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
                icon={solid("code")}
                activity={"Contributing to"}
                linkHref={"https://tixhive.com"}
                linkTitle={"TixHive"}
              />
            </li>
            <li>
              <ActivityCard
                icon={solid("code")}
                activity={"Building"}
                linkHref={"https://web3gram.live"}
                linkTitle={"Web3Gram"}
              />
            </li>
            <li>
              <ActivityCard
                icon={solid("code")}
                activity={"Contributing to"}
                linkHref={"https://africanvaluables.com"}
                linkTitle={"African Valuables"}
              />
            </li>
          </ul>
        </div>
      ),
    },
    {
      role: "Community Member",
      company: "Google Developer Student's Club, Alex-Ekwueme Federal University Ndufu-Alike",
      period: "Oct 2020 - PRESENT",
      description: (
        <div>
          <ul className="activity-group">
            <li>
              <ActivityCard
                activity={"Part of the facilitators of a six-week Dev/Design bootcamp at GDSC (AE-FUNAI)."}
              />
            </li>
            <li>
              <ActivityCard activity={"Contributing free resources and guidance to community members."} />
            </li>
          </ul>
        </div>
      ),
      icon: <FontAwesomeIcon icon={solid("people-group")} />,
    },
    {
      role: "Bachelor of Engineering Degree (Electronics Engineering)",
      company: "Alex Ekwueme Federal University",
      period: "Oct 2018 - PRESENT",
      description: (
        <div>
          <ActivityCard
            icon={solid("graduation-cap")}
            activity={"Studying for an undergraduate degree at"}
            linkHref={"https://funai.edu.ng"}
            linkTitle={"Alex Ekwueme Federal University"}
          />
        </div>
      ),
      icon: <FontAwesomeIcon icon={solid("graduation-cap")} />,
    },
  ];
  return (
    <div data-aos="fade-right" className="md:px-16 bg-gray-900 pt-5 md:pt-20 pb-9 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-white sm:px-6 px-5 md:px-0 md:text-center font-black uppercase mb-5 md:mb-20 text-3xl md:text-[3.6rem]">
          About <span className="text-portfolio-skyblue">Me</span>
        </h3>
        <hr className="border-slate-600 w-full md:max-w-[70%] md:mx-auto" />
        <h4 className="uppercase mt-12 md:mt-12 sm:px-6 px-5 md:px-0 md:text-center text-white text-xl md:text-[1.7rem] font-semibold">
          Developer Experience & education
        </h4>
        <div className="grid grid-cols-1 mt-14 mb-24 pl-9 pr-5 sm:pl-10 sm:pr-6 md:px-16 gap-16 lg:gap-20 md:grid-cols-2">
          {experience.map((item) => {
            return (
              <div className="flex relative items-start border-l border-slate-200">
                <div className="-mt-[10px] absolute left-[-22.5px]">
                  <div className="h-[45px] w-[45px] text-[18px] rounded-full text-white bg-portfolio-skyblue flex items-center justify-center">
                    {item.icon ? item.icon : <FontAwesomeIcon icon={solid("briefcase")} />}
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
        <hr className="border-slate-600 md:max-w-[70%] md:mx-auto" />
        <h4 className="uppercase mt-12 md:mt-12 px-5 sm:px-6 md:px-16 md:text-center text-white text-2xl md:text-[1.7rem] font-semibold">
          my skills
        </h4>
        <div class="grid grid-cols-2 px-5 sm:px-6 md:px-16 text-white md:grid-cols-4 mt-16 gap-16">
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={95}
                text="95%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">JavaScript</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={95}
                text="95%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">HTML & CSS</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={95}
                text="95%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">PHP</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={95}
                text="95%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">laravel</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={80}
                text="80%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">
              M<span className="lowercase">Y</span>SQL
            </h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={70}
                text="70%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">REACT & VUE</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={70}
                text="70%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">solidity</h3>
          </div>
          <div>
            <div className="h-[120px] mx-auto w-[120px]">
              <CircularProgressbar
                value={50}
                text="50%"
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#87CEEB",
                  textColor: "#87CEEB",
                  trailColor: "#475569",
                })}
              />
            </div>
            <h3 className="uppercase mt-4 text-center text-[15px] md:text-[16px]">GO</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
