import { AnimatePresence, motion } from "framer-motion";
import { CrewPagination } from "../../components/CrewPagination/CrewPagination";
import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { usePageData } from "../../hooks/usePageData";
import { useTabDirection } from "../../hooks/useTabDirection";
import {
  imageVariants,
  textVariants,
} from "../../animations/tab-transition.variants";
import styles from "./styles/crew.module.scss";

export const Crew = () => {
  const {
    pageData: crew,
    currentTab: currentCrewMember,
    onPaginationClick,
  } = usePageData("crew");
  const { direction: motionDirection, onTabChange: onCrewMemberClick } =
    useTabDirection(crew, currentCrewMember?.name, onPaginationClick);

  // TODO: Consider adding a loading screen instead of returning nothing
  if (!currentCrewMember) {
    return <></>;
  }

  // TODO: Test keyboard navigation with Screen Reader
  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="02" title="Meet your crew" />
      <article>
        {/* `mode="wait"` lets the current member leave before the next one enters */}
        <AnimatePresence mode="wait" initial={false} custom={motionDirection}>
          <motion.picture
            key={currentCrewMember.name}
            className={styles["photo-wrapper"]}
            custom={motionDirection}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <source srcSet={currentCrewMember.images.webp} type="image/webp" />
            <img
              className={styles["photo"]}
              src={currentCrewMember.images.png}
              alt=""
            />
          </motion.picture>
        </AnimatePresence>

        <hr className={styles["divider"]} />

        <div className={styles["pagination"]}>
          <CrewPagination
            crew={crew}
            currentCrewMemberName={currentCrewMember.name}
            onClick={onCrewMemberClick}
          />
        </div>

        <section className={styles["details"]} aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={motionDirection}>
            <motion.div
              key={currentCrewMember.name}
              custom={motionDirection}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <p className={styles["rank"]}>{currentCrewMember.role}</p>

              <Heading variant="small" text={currentCrewMember.name} />

              <div className={styles["spacer"]} />

              <div className={styles["description-wrapper"]}>
                <Description>{currentCrewMember.bio}</Description>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </article>
    </main>
  );
};
