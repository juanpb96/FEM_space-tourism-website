import { Description } from "../../components/Description/Description";
import { ExploreButton } from "../../components/ExploreButton/ExploreButton";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import styles from "./styles/home.module.scss";

export const Home = () => {
  return (
    <main className={styles["wrapper"]}>
      <section className={styles["introduction"]}>
        <Subtitle title="So, you want to travel to" />
        <Heading text="Space" variant="large" />
        <Description>
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </Description>
      </section>
      <ExploreButton navigateTo="/destination">Explore</ExploreButton>
    </main>
  );
};
