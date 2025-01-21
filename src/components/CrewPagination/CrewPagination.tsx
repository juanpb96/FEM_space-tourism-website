import { CrewMember } from "../../pages/Crew/types";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
import styles from "./styles/crew-pagination.module.scss";

interface CrewPaginationProps {
  crew: CrewMember[];
  currentCrewMemberName: string;
  onClick: (name: string) => void;
}

// TODO: In small screens, it should have enough size for the user to click - Issue #48
export const CrewPagination = ({
  crew,
  currentCrewMemberName,
  onClick,
}: CrewPaginationProps) => {
  return (
    <ul className={styles["wrapper"]}>
      {crew.map((crewMember, index) => (
        <li
          key={crewMember.name}
          className={styles["clickable-area"]}
          onClick={() => onClick(crewMember.name)}
        >
          <button
            className={[
              styles["button"],
              crewMember.name === currentCrewMemberName ? styles["active"] : "",
            ].join(" ")}
          >
            <VisuallyHidden>Crew Member {index + 1}</VisuallyHidden>
            {crewMember.name === currentCrewMemberName && (
              <VisuallyHidden>(Current crew member)</VisuallyHidden>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};
