import { Description } from "../../components/Description/Description";
import { Heading } from "../../components/Heading/Heading";
import { Subtitle } from "../../components/Subtitle/Subtitle";

export const Technology = () => {
  return (
    <main>
      <Subtitle
        prefix="03"
        title="Space Launch 101"
      />
      <picture>
        <source srcSet="./assets/technology/image-launch-vehicle-landscape.avif" type='image/avif' />
        <img src="./assets/technology/image-launch-vehicle-landscape.jpg" alt="" />
      </picture>
      <div>
        Pagination 1 ... 2 ... 3
      </div>
      <h3>THE TERMINOLOGY…</h3>
      <Heading
        variant="small"
        text="Launch Vehicle"
      />
      <Description>
        A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!
      </Description>
    </main>
  );
};
