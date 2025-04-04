import { Technology } from "../../types";
import styles from "./styles/pagination.module.scss";

interface PaginationProps {
  technologies: Technology[];
  selectedTechnologyName: string;
  onClick: (name: string) => void;
}

export const Pagination = ({
  technologies,
  selectedTechnologyName,
  onClick,
}: PaginationProps) => {
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
