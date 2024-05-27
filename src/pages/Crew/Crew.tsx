import { CrewPagination } from "../../components/CrewPagination/CrewPagination";
import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import styles from './styles/crew.module.scss';

export const Crew = () => {
  return (
    <main className={styles["wrapper"]}>
      <Subtitle
        prefix="02"
        title="Meet your crew"
      />
      <picture>
        <source srcSet="./assets/crew/image-douglas-hurley.webp" type='image/webp' />
        <img className={styles["crew-member"]} src="./assets/crew/image-douglas-hurley.png" alt="" />
      </picture>
      <hr className={styles["divider"]}/>
      <CrewPagination />
      <h4 className={styles["rank"]}>Commander</h4>
      <Heading
        variant="small"
        text="Douglas Hurley"
      />
      <div className={styles["spacer"]}></div>
      <Description>
        Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.
      </Description>
    </main>
  );
};
