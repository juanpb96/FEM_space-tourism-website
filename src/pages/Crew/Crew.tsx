import { CrewPagination } from "../../components/CrewPagination/CrewPagination";
import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { useScreenType } from "../../hooks/useScreenType";
import styles from "./styles/crew.module.scss";
import { useCrew } from "./useCrew";

// TODO: Check this article to get inspiration: https://www.freecodecamp.org/news/build-an-image-carousel-with-react-and-framer-motion/
export const Crew = () => {
  const { crew, currentCrewMember, onPaginationClick } = useCrew();
  const screenType = useScreenType();
  const isSmallDevice = screenType === "mobile" || screenType === "tablet";

  // TODO: Consider adding a loading screen instead of returning nothing
  if (!currentCrewMember) {
    return <></>;
  }

  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="02" title="Meet your crew" />
      <article>
        <section className={styles["details"]}>
          <h4 className={styles["rank"]}>{currentCrewMember.role}</h4>
          {/* TODO: Consider changing the heading tag based on a prop (i.e. as="h4") */}
          <Heading variant="small" text={currentCrewMember.name} />

          <div className={styles["spacer"]} />

          <div className={styles["description-wrapper"]}>
            <Description>{currentCrewMember.bio}</Description>
          </div>
          {/* TODO: Need to pass custom styles and fix styles for all viewports */}
          {!isSmallDevice && (
            <CrewPagination
              crew={crew}
              currentCrewMember={currentCrewMember}
              onClick={onPaginationClick}
            />
          )}
        </section>

        {isSmallDevice && (
          <CrewPagination
            crew={crew}
            currentCrewMember={currentCrewMember}
            onClick={onPaginationClick}
          />
        )}

        <div>
          <picture>
            <source srcSet={currentCrewMember.images.webp} type="image/webp" />
            <img
              className={styles["photo"]}
              src={currentCrewMember.images.png}
              alt=""
            />
          </picture>
          <hr className={styles["divider"]} />
        </div>
      </article>
    </main>
  );
};
