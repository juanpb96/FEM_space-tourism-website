import { getCrewAdapter } from "../../adapter/getCrewAdapter";
import { CrewMember } from "../../types";
describe("getCrewAdapter", () => {
  it("should return the crew", async () => {
    const expectedCrew: CrewMember[] = [
      {
        name: "Douglas Hurley",
        images: {
          png: "./assets/crew/image-douglas-hurley.png",
          webp: "./assets/crew/image-douglas-hurley.webp",
        },
        role: "Commander",
        bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
      },
      {
        name: "Mark Shuttleworth",
        images: {
          png: "./assets/crew/image-mark-shuttleworth.png",
          webp: "./assets/crew/image-mark-shuttleworth.webp",
        },
        role: "Mission Specialist",
        bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
      },
    ];

    const fake = () => Promise.resolve(expectedCrew);
    const getCrew = getCrewAdapter({ get: fake });

    const result = await getCrew();

    expect(result).toEqual(expectedCrew);
  });
});
