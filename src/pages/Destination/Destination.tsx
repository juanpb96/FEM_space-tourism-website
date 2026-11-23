import { AnimatePresence, motion } from "framer-motion";
import { Description } from "../../components/Description/Description";
import { DestinationDetails } from "../../components/DestinationDetails/DestinationDetails";
import { Heading } from "../../components/Heading/Heading";
import { DestinationPagination } from "../../components/DestinationPagination/DestinationPagination";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { usePageData } from "../../hooks/usePageData";
import { DataStatusBadge } from "../../components/DataStatusBadge/DataStatusBadge";
import { useTabDirection } from "../../hooks/useTabDirection";
import {
  imageVariants,
  textVariants,
} from "../../animations/tab-transition.variants";
import styles from "./styles/destination.module.scss";

export const Destination = () => {
  const {
    pageData: destinations,
    currentTab: currentDestination,
    onPaginationClick,
    dataState,
    retry,
  } = usePageData("destinations");
  const { direction, onTabChange } = useTabDirection(
    destinations,
    currentDestination?.name,
    onPaginationClick
  );

  if (!currentDestination) {
    return;
  }

  const { name, images, description, distance, travel } = currentDestination;
  const pages = destinations.map((destination) => destination.name);

  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="01" title="Pick your destination" />
      {/* `mode="wait"` lets the current destination leave before the next one enters */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.picture
          key={name}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <source srcSet={images.webp} type="image/webp" />
          <img src={images.png} alt="" />
        </motion.picture>
      </AnimatePresence>
      <div className={styles["info"]}>
        <DestinationPagination pages={pages} setActivePage={onTabChange} />
        <div className={styles["spacer"]} />
        <section className={styles["text"]} aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={name}
              className={styles["text"]}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Heading text={name} variant="medium" />
              <div className={styles["description-wrapper"]}>
                <Description>{description}</Description>
                <div className={styles["details"]}>
                  <DestinationDetails title="Avg. Distance" value={distance} />
                  <DestinationDetails
                    title="Est. Travel Time"
                    value={travel}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
      <DataStatusBadge dataState={dataState} onRetry={retry} />
    </main>
  );
};
