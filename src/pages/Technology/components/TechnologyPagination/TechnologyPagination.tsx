import { Technology } from "../../types";
import styles from "./styles/technology-pagination.module.scss";

interface TechnologyPaginationProps {
  technologies: Technology[];
  selectedTechnologyName: string;
  onClick: (name: string) => void;
}

export const TechnologyPagination = ({
  technologies,
  selectedTechnologyName,
  onClick,
}: TechnologyPaginationProps) => {
  return (
    <div
      role="group"
      aria-label="Select the technology you want to learn about"
      className={styles["wrapper"]}
    >
      {technologies.map((technology, index) => (
        <button
          key={technology.name}
          onClick={() => onClick(technology.name)}
          className={styles["button"]}
          aria-label={technology.name}
          aria-pressed={selectedTechnologyName === technology.name}
        >
          <span aria-hidden="true">{index + 1}</span>
        </button>
      ))}
    </div>
  );
};
