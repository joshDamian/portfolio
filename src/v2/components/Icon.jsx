import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

/* Icon names are resolved by the babel macro at build time. Only names that
   already compile elsewhere in the app appear here: an unknown name is a build
   failure, not a silent blank, so this list stays closed on purpose. */
const ICONS = {
  briefcase: solid("briefcase"),
  laptop: solid("laptop"),
  "laptop-code": solid("laptop-code"),
  "people-group": solid("people-group"),
  flask: solid("flask"),
  "thumbs-up": solid("thumbs-up"),
  palette: solid("palette"),
  lightbulb: solid("lightbulb"),
  "users-gear": solid("users-gear"),
  "user-check": solid("user-check"),
  "user-cog": solid("user-cog"),
  handshake: solid("handshake"),
  "hands-helping": solid("hands-helping"),
  cubes: solid("cubes"),
  "chalkboard-teacher": solid("chalkboard-teacher"),
  music: solid("music"),
  "graduation-cap": solid("graduation-cap"),
  brain: solid("brain"),
  rocket: solid("rocket"),
  envelope: solid("envelope"),
  copy: solid("copy"),
  check: solid("check"),
  "up-right-from-square": solid("up-right-from-square"),
};

export default function Icon({ name, className }) {
  // Fallback to the same briefcase v1 uses for roles with no bespoke icon.
  return <FontAwesomeIcon icon={ICONS[name] || ICONS.briefcase} className={className} />;
}
