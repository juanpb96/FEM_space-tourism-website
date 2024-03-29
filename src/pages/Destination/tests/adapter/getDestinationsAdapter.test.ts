import { getDestinationsAdapter } from "../../adapter/getDestinationsAdapter";
import type { Destinations } from "../../types";

describe('getDestinationsAdapter', () => {
  it('should return the destinations', async () => {
    const expectedDestinations: Destinations = {
      destinations: [{
        name: "Moon",
        images: {
          png: "./assets/destination/image-moon.png",
          webp: "./assets/destination/image-moon.webp"
        },
        description: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
        distance: "384,400 km",
        travel: "3 days"
      }]
    };
    const fake = () => Promise.resolve(expectedDestinations);
    const getDestinations = getDestinationsAdapter({ get: fake });

    const result = await getDestinations();

    expect(result).toEqual(expectedDestinations);
  })
});