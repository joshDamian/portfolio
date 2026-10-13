/* ---------------------------------------------------------------------------
   Career history for the About page.

   Ported from the `experience` array in src/pages/About.jsx: the JSX that used
   to be embedded in the data is now plain data, and the wording has been
   rewritten in plainer language (same roles, dates, numbers and links). v1
   keeps the original copy.

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
      after: ", a stablecoin bank for everyday people.",
    },
    activities: [
      {
        icon: "laptop",
        text: "Lead the product and engineering of Azza Bot: $5M+ in on-chain volume across 9+ blockchains, and 6k+ users.",
      },
      {
        icon: "people-group",
        text: "Run growth campaigns to bring in new users and reach new markets.",
      },
      {
        icon: "flask",
        text: "Ship early, learn from what doesn't work, and adjust the product.",
      },
      {
        icon: "thumbs-up",
        text: "Make paying with Azza simple, and pleasant to use.",
      },
    ],
  },
  {
    role: "Lead Software Developer",
    company: "Blocverse",
    period: "Mar 2022 - Present",
    intro: { before: "Making it easier for people to get started with Web3." },
    activities: [
      { icon: "people-group", text: "Lead the development team." },
      { icon: "flask", text: "Make mistakes early and learn from them." },
      {
        icon: "thumbs-up",
        text: "Deliver software clients are happy with.",
      },
      { icon: "palette", text: "Push for designing before building." },
    ],
  },
  {
    role: "Entrepreneur",
    company: "Antler",
    period: "Oct 2022 - Dec 2022",
    icon: "lightbulb",
    intro: {
      before:
        "Three months of design thinking, meeting people and hearing other points of view. The best three months of my 2022.",
    },
    activities: [
      {
        icon: "users-gear",
        text: "Took part in design-thinking sessions with other founders.",
      },
      {
        icon: "user-check",
        text: "Learned to start from the user's problem.",
      },
      { icon: "handshake", text: "Met industry experts and investors." },
    ],
  },
  {
    role: "Fullstack Developer",
    company: "Blocverse",
    period: "Jul 2021 - Feb 2022",
    intro: {
      before: "Built Web3 apps with the dev team at ",
      link: { href: "https://blocverse.com", label: "Blocverse" },
      after: ".",
    },
    activities: [
      { icon: "cubes", text: "Built prototypes and MVPs for clients." },
      {
        icon: "chalkboard-teacher",
        text: "Led the development of the Blocverse education platform.",
        link: { href: "https://blog.blocverse.com", label: "Blocverse Blog" },
      },
      {
        icon: "music",
        text: "Designed a token-gated music platform for artists.",
        link: { href: "https://africanvaluables.com", label: "African Valuables" },
      },
      { icon: "graduation-cap", text: "Learned the basics of Web3 development." },
    ],
  },
  {
    role: "Fullstack Developer/Co-founder",
    company: "Ecorun",
    period: "Jul 2020 - Mar 2021",
    icon: "rocket",
    intro: {
      before:
        "A social-commerce startup. I built a store-management system for people selling on social media. It got some users, but we shut it down. It was the first thing I built that people used.",
    },
    activities: [
      {
        icon: "brain",
        text: "Tried a wide range of technology, from bare metal to frameworks.",
      },
      { icon: "user-cog", text: "Got my first experience of building a company." },
      { icon: "laptop-code", text: "Got hooked on web development." },
    ],
  },
  {
    role: "Community Member",
    company:
      "Google Developer Student's Club, Alex-Ekwueme Federal University Ndufu-Alike",
    period: "Oct 2020 - 2023",
    icon: "people-group",
    activities: [
      { icon: "chalkboard-teacher", text: "Ran a six-week dev and design bootcamp." },
      {
        icon: "hands-helping",
        text: "Shared resources and helped other members.",
      },
    ],
  },
];
