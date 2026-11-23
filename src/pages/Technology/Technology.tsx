import { AnimatePresence, motion } from "framer-motion";
import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { usePageData } from "../../hooks/usePageData";
import { DataStatusBadge } from "../../components/DataStatusBadge/DataStatusBadge";
import { useTabDirection } from "../../hooks/useTabDirection";
import {
  imageVariants,
  textVariants,
} from "../../animations/tab-transition.variants";
import { TechnologyPagination } from "./components/TechnologyPagination";
import styles from "./styles/technology.module.scss";

export const Technology = () => {
  const {
    pageData: technologies,
    currentTab: currentTechnology,
    onPaginationClick,
    dataState,
    retry,
  } = usePageData("technology");
  const { direction, onTabChange } = useTabDirection(
    technologies,
    currentTechnology?.name,
    onPaginationClick
  );

  // TODO: Add a loading screen instead of returning nothing - Issue #88
  if (!currentTechnology) {
    return <></>;
  }

  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="03" title="Space Launch 101" />

      <div className={styles["content"]}>
        {/* `mode="wait"` lets the current technology leave before the next one enters */}
        {/* TODO: Add avif fallback for portrait images - Issue #88 */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.picture
            key={currentTechnology.name}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <source
              media="(min-width: 81.25rem)"
              srcSet={currentTechnology.images.portrait}
            />
            {/* <source
              srcSet="./assets/technology/image-launch-vehicle-landscape.avif"
              type="image/avif"
            /> */}
            <img
              className={styles["photo"]}
              src={currentTechnology.images.landscape}
              alt=""
            />
          </motion.picture>
        </AnimatePresence>

        <article>
          <div className={styles["pagination"]}>
            <TechnologyPagination
              technologies={technologies}
              selectedTechnologyName={currentTechnology.name}
              onClick={onTabChange}
            />
          </div>

          <section aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentTechnology.name}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className={styles["terminology"]}>THE TERMINOLOGY…</p>

                <Heading variant="small" text={currentTechnology.name} />

                <div className={styles["description-wrapper"]}>
                  <Description>{currentTechnology.description}</Description>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </article>
      </div>
      <DataStatusBadge dataState={dataState} onRetry={retry} />
    </main>
  );
};
