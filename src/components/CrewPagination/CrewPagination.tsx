import { CrewMember } from "../../pages/Crew/types";
import styles from "./styles/crew-pagination.module.scss";

interface CrewPaginationProps {
  crew: CrewMember[];
  currentCrewMember: CrewMember;
  onClick: (name: string) => void;
}

export const CrewPagination = ({
  crew,
  currentCrewMember,
  onClick,
}: CrewPaginationProps) => {
  return (
    <ul className={styles["wrapper"]}>
      {crew.map((crewMember) => (
        <li
          key={crewMember.name}
          onClick={() => onClick(crewMember.name)}
          className={
            crewMember.name === currentCrewMember.name ? styles["active"] : ""
          }
        />
      ))}
    </ul>
  );
};
