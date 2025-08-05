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
    <ol className={styles["wrapper"]}>
      {technologies.map((technology, index) => (
        <li
          key={technology.name}
          onClick={() => onClick(technology.name)}
          className={
            selectedTechnologyName === technology.name ? styles["active"] : ""
          }
        >
          {index + 1}
        </li>
      ))}
    </ol>
  );
};
