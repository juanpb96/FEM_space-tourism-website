import { CrewPagination } from "../../components/CrewPagination/CrewPagination";
import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { usePageData } from "../../hooks/usePageData";
import styles from "./styles/crew.module.scss";

// TODO: Check this before working on the Carousel: https://www.w3.org/WAI/tutorials/carousels/ - Issue #80
// Check this article to get inspiration: https://www.freecodecamp.org/news/build-an-image-carousel-with-react-and-framer-motion/
// And this one: https://www.framer.com/motion/examples/#exit-animations
export const Crew = () => {
  const {
    pageData: crew,
    currentTab: currentCrewMember,
    onPaginationClick,
  } = usePageData("crew");

  // TODO: Consider adding a loading screen instead of returning nothing
  if (!currentCrewMember) {
    return <></>;
  }

  // TODO: Test keyboard navigation with Screen Reader
  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="02" title="Meet your crew" />
      <article>
        <picture className={styles["photo-wrapper"]}>
          <source srcSet={currentCrewMember.images.webp} type="image/webp" />
          <img
            className={styles["photo"]}
            src={currentCrewMember.images.png}
            alt=""
          />
        </picture>

        <hr className={styles["divider"]} />

        <div className={styles["pagination"]}>
          <CrewPagination
            crew={crew}
            currentCrewMemberName={currentCrewMember.name}
            onClick={onPaginationClick}
          />
        </div>

        <section className={styles["details"]}>
          <h4 className={styles["rank"]}>{currentCrewMember.role}</h4>

          <Heading variant="small" text={currentCrewMember.name} />

          <div className={styles["spacer"]} />

          <div className={styles["description-wrapper"]}>
            <Description>{currentCrewMember.bio}</Description>
          </div>
        </section>
      </article>
    </main>
  );
};
