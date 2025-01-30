import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { Pagination } from "./components/Pagination";
import styles from "./styles/technology.module.scss";
import { useTechnology } from "./useTechnology";

export const Technology = () => {
  const { technologies, onPaginationClick, selectedTechnology } =
    useTechnology();

  // TODO: Add a loading screen instead of returning nothing
  if (!selectedTechnology) {
    return <></>;
  }

  return (
    <main className={styles["wrapper"]}>
      <Subtitle prefix="03" title="Space Launch 101" />

      <div className={styles["content"]}>
        {/* TODO: Add avif fallback for portrait images */}
        <picture>
          <source
            media="(min-width: 64rem)"
            srcSet={selectedTechnology.images.portrait}
          />
          {/* <source
            srcSet="./assets/technology/image-launch-vehicle-landscape.avif"
            type="image/avif"
          /> */}
          <img
            className={styles["photo"]}
            src={selectedTechnology.images.landscape}
            alt=""
          />
        </picture>

        <article>
          <div className={styles["pagination"]}>
            <Pagination
              technologies={technologies}
              selectedTechnologyName={selectedTechnology.name}
              onClick={onPaginationClick}
            />
          </div>

          <div>
            <p className={styles["terminology"]}>THE TERMINOLOGY…</p>

            <Heading variant="small" text={selectedTechnology.name} />

            <div className={styles["description-wrapper"]}>
              <Description>{selectedTechnology.description}</Description>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
