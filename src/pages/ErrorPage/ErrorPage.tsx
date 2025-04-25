import { Description } from "../../components/Description/Description";
import { ExploreButton } from "../../components/ExploreButton/ExploreButton";
import { Heading } from "../../components/Heading/Heading";
import styles from "./styles/error-page.module.scss";

export const ErrorPage = () => {
  return (
    <main className={styles["wrapper"]}>
      <section className={styles["introduction"]}>
        <Heading variant="small" text="LOST IN SPACE?" />
        <Heading text="404" variant="large" />
        <Description>
          Houston, we have a missing page! It appears to be currently out of
          reach. We're working to restore contact, don't panic! You can return
          home or explore other pages via the menu.
        </Description>
      </section>
      <ExploreButton navigateTo="/home" variant="pill">
        Back Home
      </ExploreButton>
    </main>
  );
};
