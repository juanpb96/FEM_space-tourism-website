import { getTechnologyAdapter } from "../../adapter/getTechnologyAdapter";
import { Technology } from "../../types";

describe("getTechnologyAdapter", () => {
  it("should return technology list", async () => {
    const expectedTechnology: Technology[] = [
      {
        name: "Launch vehicle",
        images: {
          portrait: "./assets/technology/image-launch-vehicle-portrait.jpg",
          landscape: "./assets/technology/image-launch-vehicle-landscape.jpg",
        },
        description:
          "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
      },
      {
        name: "Spaceport",
        images: {
          portrait: "./assets/technology/image-spaceport-portrait.jpg",
          landscape: "./assets/technology/image-spaceport-landscape.jpg",
        },
        description:
          "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
      },
    ];

    const fake = () => Promise.resolve(expectedTechnology);
    const getTechnology = getTechnologyAdapter({ get: fake });

    const result = await getTechnology();

    expect(result).toEqual(expectedTechnology);
  });
});
