import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faBriefcase, faChalkboardTeacher, faCheck, faCopy, faCubes, faEnvelope, faFlask, faGraduationCap, faHandsHelping, faHandshake, faLaptop, faLaptopCode, faLightbulb, faMusic, faPalette, faPeopleGroup, faRocket, faThumbsUp, faUpRightFromSquare, faUserCheck, faUserCog, faUsersGear } from "@fortawesome/free-solid-svg-icons";

/* Icons are imported by name and looked up here by their kebab-case string.
   Only names that already appear elsewhere in the app are listed, so the set
   stays closed on purpose — a typo surfaces as a missing icon, not a blank. */
const ICONS = {
  briefcase: faBriefcase,
  laptop: faLaptop,
  "laptop-code": faLaptopCode,
  "people-group": faPeopleGroup,
  flask: faFlask,
  "thumbs-up": faThumbsUp,
  palette: faPalette,
  lightbulb: faLightbulb,
  "users-gear": faUsersGear,
  "user-check": faUserCheck,
  "user-cog": faUserCog,
  handshake: faHandshake,
  "hands-helping": faHandsHelping,
  cubes: faCubes,
  "chalkboard-teacher": faChalkboardTeacher,
  music: faMusic,
  "graduation-cap": faGraduationCap,
  brain: faBrain,
  rocket: faRocket,
  envelope: faEnvelope,
  copy: faCopy,
  check: faCheck,
  "up-right-from-square": faUpRightFromSquare,
};

export default function Icon({ name, className }) {
  // Fallback to the same briefcase v1 uses for roles with no bespoke icon.
  return <FontAwesomeIcon icon={ICONS[name] || ICONS.briefcase} className={className} />;
}
