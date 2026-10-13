import { useEffect, useState } from "react";
import { MY_EMAIL } from "../../constants/strings";
import { copyToClipboard } from "../../utils/clipboard";
import { EXPERIENCE } from "../data/experience";
import Icon from "../components/Icon";

function Intro({ intro }) {
  if (!intro) return null;
  return (
    <p className="xp__intro">
      {intro.before}
      {intro.link && (
        <a
          className="xp__link"
          href={intro.link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="up-right-from-square" className="xp__link-ico" />
          {intro.link.label}
        </a>
      )}
      {intro.after}
    </p>
  );
}

export default function About() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setCopied(await copyToClipboard(MY_EMAIL));
  };

  return (
    <>
      <header className="section section--tight wrap">
        <span className="eyebrow">About</span>
        <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
          Me
        </h1>
      </header>

      <section className="wrap" style={{ paddingBottom: "var(--s6)" }}>
        <div className="prose">
          <p>
            I’m a software developer. I’ve wanted to know how things work for as
            long as I can remember, and I like building tools that make everyday
            life a little easier. I design first: I work out how something should
            feel to use, then build it. I’m still learning all the time.
          </p>
          <p>
            I’m interested in systems, in software and outside it. Most things
            run on rules you can learn, and once you understand them you can
            change them. Software is how I try to make the way we live and work
            run a bit better.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <h2 className="h2">Career milestones</h2>
        <ol className="xp">
          {EXPERIENCE.map((item) => (
            <li className="xp__item" key={`${item.company}-${item.period}`}>
              <span className="xp__mark" aria-hidden="true">
                <Icon name={item.icon || "briefcase"} />
              </span>
              <p className="xp__when">{item.period}</p>
              <h3 className="xp__role">
                {item.role}, <span className="xp__co">{item.company}</span>
              </h3>
              <Intro intro={item.intro} />
              {item.activities && (
                <ul className="xp__acts">
                  {item.activities.map((activity) => (
                    <li className="xp__act" key={activity.text}>
                      <span className="xp__ico" aria-hidden="true">
                        <Icon name={activity.icon} />
                      </span>
                      <span>
                        {activity.text}
                        {activity.link && (
                          <>
                            {" "}
                            <a
                              className="xp__link"
                              href={activity.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon name="up-right-from-square" className="xp__link-ico" />
                              {activity.link.label}
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap">
        <div className="callout">
          <div>
            <p className="eyebrow" style={{ marginBottom: "var(--s2)" }}>
              Contact
            </p>
            <p className="callout__email">{MY_EMAIL}</p>
          </div>
          <div className="callout__actions">
            <a className="btn btn--accent" href={`mailto:${MY_EMAIL}`}>
              <Icon name="envelope" /> Send me an email
            </a>
            <button className="btn" type="button" onClick={handleCopy}>
              <Icon name={copied ? "check" : "copy"} /> {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
