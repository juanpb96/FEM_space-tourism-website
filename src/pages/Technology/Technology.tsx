import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";
import { Pagination } from "./components/Pagination";
import styles from "./styles/technology.module.scss";

export const Technology = () => {
  return (
    <main className={styles["wrapper"]}>
      <Subtitle
        prefix="03"
        title="Space Launch 101"
      />

      <div className={styles["content"]}>
        {/* TODO: Add avif fallback for portrait images */}
        <picture>
          <source media="(min-width: 64rem)" srcSet="./assets/technology/image-launch-vehicle-portrait.jpg" />
          <source srcSet="./assets/technology/image-launch-vehicle-landscape.avif" type='image/avif' />
          <img className={styles["photo"]} src="./assets/technology/image-launch-vehicle-landscape.jpg" alt="" />
        </picture>

        <article>
          <div className={styles["pagination"]}>
            <Pagination />
          </div>

          <div>
            <p className={styles["terminology"]}>
              THE TERMINOLOGY…
            </p>

            <Heading
              variant="small"
              text="Launch Vehicle"
            />

            <div className={styles["description-wrapper"]}>
              <Description>
                A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!
              </Description>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
