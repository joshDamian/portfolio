import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ActivityCard({ activity, linkHref, linkTitle, icon }) {
  return (
    <div className="bg-gradient p-4 text-white rounded-md">
      <FontAwesomeIcon icon={icon || solid("trophy")} className="mr-2" />
      {activity}{" "}
      {linkTitle && linkHref && (
        <a className="text-blue-400" target="_blank" rel="noreferrer" href={linkHref}>
          {linkTitle}
          <FontAwesomeIcon className="ml-1.5" icon={solid("up-right-from-square")} />
        </a>
      )}
    </div>
  );
}
