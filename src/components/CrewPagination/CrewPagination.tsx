import { CrewMember } from "../../pages/Crew/types";
import styles from "./styles/crew-pagination.module.scss";

interface CrewPaginationProps {
  crew: CrewMember[];
  currentCrewMemberName: string;
  onClick: (name: string) => void;
}

export const CrewPagination = ({
  crew,
  currentCrewMemberName,
  onClick,
}: CrewPaginationProps) => {
  return (
    <div
      role="group"
      aria-label="Choose a crew member"
      className={styles["wrapper"]}
    >
      {crew.map((crewMember) => {
        const isActive = crewMember.name === currentCrewMemberName;

        return (
          <button
            key={crewMember.name}
            aria-label={crewMember.name}
            aria-pressed={isActive}
            onClick={() => onClick(crewMember.name)}
            className={styles["button"]}
          />
        );
      })}
    </div>
  );
};
