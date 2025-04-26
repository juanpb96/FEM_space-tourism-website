import styles from "./styles/button.module.scss";
import { NavLink } from "react-router-dom";

interface ExploreButtonProps extends React.PropsWithChildren {
  navigateTo: string;
  variant?: "circle" | "pill";
}

export const Button = ({
  navigateTo,
  variant = "circle",
  children,
}: ExploreButtonProps) => {
  return (
    <NavLink
      to={navigateTo}
      className={`${styles["button"]} ${styles[variant]}`}
    >
      {children}
    </NavLink>
  );
};
