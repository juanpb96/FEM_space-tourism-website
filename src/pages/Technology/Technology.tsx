import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { usePageData } from "../../hooks/usePageData";
import { TechnologyPagination } from "./components/TechnologyPagination";
import styles from "./styles/technology.module.scss";

export const Technology = () => {
  const {
    pageData: technologies,
    currentTab: currentTechnology,
    onPaginationClick,
  } = usePageData("technology");

  // TODO: Add a loading screen instead of returning nothing - Issue #88
  if (!currentTechnology) {
    return <></>;
  }

  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="03" title="Space Launch 101" />

      <div className={styles["content"]}>
        {/* TODO: Add avif fallback for portrait images - Issue #88 */}
        <picture>
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
        </picture>

        <article>
          <div className={styles["pagination"]}>
            <TechnologyPagination
              technologies={technologies}
              selectedTechnologyName={currentTechnology.name}
              onClick={onPaginationClick}
            />
          </div>

          <div>
            <p className={styles["terminology"]}>THE TERMINOLOGY…</p>

            <Heading variant="small" text={currentTechnology.name} />

            <div className={styles["description-wrapper"]}>
              <Description>{currentTechnology.description}</Description>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
