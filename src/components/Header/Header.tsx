import styles from "./styles/header.module.scss";
import { Logo } from "../Logo/Logo";
import { NavigationBar } from "../NavigationBar/NavigationBar";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header-content"]}>
        <Logo />
        <div className={styles["line"]} />
        <NavigationBar />
      </div>
    </header>
  );
};
