import styles from "./styles/explore-button.module.scss";
import { NavLink } from "react-router-dom";

interface ExploreButtonProps {
  className?: string;
}

export const ExploreButton = ({ className }: ExploreButtonProps) => {
  return (
    <NavLink
      to={"/destination"}
      className={`${styles["button-explore"]} ${className}`}
    >
      Explore
    </NavLink>
  );
};
