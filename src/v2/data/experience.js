/* ---------------------------------------------------------------------------
   Career history for the About page.

   Ported verbatim from the `experience` array in src/pages/About.jsx, with one
   change: the JSX that used to be embedded in the data is now plain data, and
   components are composed at render time.

   `icon` values are limited to names v1 already compiles, since the
   @fortawesome macro resolves icon names at build time and an unknown name
   fails the build.

   One content fix: v1 reads "Led the development of the Blocverse education
   platform. now," — a truncated sentence with a stray "now,". Rendered here
   as "platform." Flagging it rather than silently rewriting copy.
--------------------------------------------------------------------------- */

export const EXPERIENCE = [
  {
    role: "Co-Founder & CTO",
    company: "UseAzza",
    period: "Jan 2025 – Present",
    intro: {
      before: "Building ",
      link: { href: "https://www.useazza.com", label: "Azza" },
      after: " — the most accessible stablecoin bank for everyday people.",
    },
    activities: [
      {
        icon: "laptop",
        text: "Driving the vision and engineering of Azza Bot — powering $5M+ in on-chain volume across 9+ blockchains, trusted by 6k+ users and counting.",
      },
      {
        icon: "people-group",
        text: "Spearheading growth campaigns that turn ideas into traction, fueling adoption and opening doors in new markets.",
      },
      {
        icon: "flask",
        text: "Failing fast, learning faster — using every misstep as momentum to sharpen our product and strategy.",
      },
      {
        icon: "thumbs-up",
        text: "Crafting experiences people actually enjoy spending money through — where finance feels effortless, even fun.",
      },
    ],
  },
  {
    role: "Lead Software Developer",
    company: "Blocverse",
    period: "Mar 2022 - Present",
    intro: { before: "Contributing my efforts to make Web3 onboarding easier and smooth." },
    activities: [
      { icon: "people-group", text: "Leading the development team at Blocverse." },
      { icon: "flask", text: "Failing early and learning from my mistakes." },
      {
        icon: "thumbs-up",
        text: "Delivering software that meets client's satisfaction.",
      },
      { icon: "palette", text: "Championing design-driven development." },
    ],
  },
  {
    role: "Entrepreneur",
    company: "Antler",
    period: "Oct 2022 - Dec 2022",
    icon: "lightbulb",
    intro: {
      before:
        "3 months of design-thinking experiences, networking and getting diverse perspectives. Best 3 months of 2022.",
    },
    activities: [
      {
        icon: "users-gear",
        text: "Engaged in design-thinking sessions with a diverse group of entrepreneurs.",
      },
      {
        icon: "user-check",
        text: "Gained insight on the importance of user-centric problem solving.",
      },
      { icon: "handshake", text: "Networked with industry experts and investors." },
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Blocverse",
    period: "Jul 2021 - Feb 2022",
    intro: {
      before: "Building Web3 powered applications with the Dev team at ",
      link: { href: "https://blocverse.com", label: "Blocverse" },
      after: ".",
    },
    activities: [
      { icon: "cubes", text: "Built concept products and MVPs for clients." },
      {
        icon: "chalkboard-teacher",
        text: "Led the development of the Blocverse education platform.",
        link: { href: "https://blog.blocverse.com", label: "Blocverse Blog" },
      },
      {
        icon: "music",
        text: "Architected a token-gated music platform for artists.",
        link: { href: "https://africanvaluables.com", label: "African Valuables" },
      },
      { icon: "graduation-cap", text: "Learnt the ropes of Web3 development." },
    ],
  },
  {
    role: "Fullstack Developer/Co-founder",
    company: "Ecorun",
    period: "Jul 2020 - Mar 2021",
    icon: "rocket",
    intro: {
      before:
        "Targeted the social-commerce market. Built a social-store management system. Got some users and engagement but ultimately closed it down. My first rodeo at building anything people used.",
    },
    activities: [
      {
        icon: "brain",
        text: "Explored a wide range of technologies, from bare-metal to frameworks.",
      },
      { icon: "user-cog", text: "Gained my first experience with building a venture." },
      { icon: "laptop-code", text: "Developed keen interests in web development." },
    ],
  },
  {
    role: "Community Member",
    company:
      "Google Developer Student's Club, Alex-Ekwueme Federal University Ndufu-Alike",
    period: "Oct 2020 - 2023",
    icon: "people-group",
    activities: [
      { icon: "chalkboard-teacher", text: "Facilitated a six-week Dev/Design bootcamp." },
      {
        icon: "hands-helping",
        text: "Contributed resources and guidance to community members.",
      },
    ],
  },
];
