import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function ActivityCard({ activity, linkHref, linkTitle, icon }) {
  return (
    <div className="bg-gradient p-4 text-white rounded-md">
      <FontAwesomeIcon icon={icon || faTrophy} className="mr-2" />
      {activity}{" "}
      {linkTitle && linkHref && (
        <a className="text-blue-400" target="_blank" rel="noreferrer" href={linkHref}>
          {linkTitle}
          <FontAwesomeIcon className="ml-1.5" icon={faUpRightFromSquare} />
        </a>
      )}
    </div>
  );
}
