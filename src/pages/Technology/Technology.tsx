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

      <picture>
        <source srcSet="./assets/technology/image-launch-vehicle-landscape.avif" type='image/avif' />
        <img className={styles["photo"]} src="./assets/technology/image-launch-vehicle-landscape.jpg" alt="" />
      </picture>

      <div className={styles["pagination"]}>
        <Pagination />
      </div>

      <h4 className={styles["terminology"]}>THE TERMINOLOGY…</h4>
      <Heading
        variant="small"
        text="Launch Vehicle"
      />

      <div className={styles["spacer"]} />

      <div className={styles["description-wrapper"]}>
        <Description>
          A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!
        </Description>
      </div>
    </main>
  );
};
