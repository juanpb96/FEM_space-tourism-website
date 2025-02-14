import { useEffect, useState } from "react";
import { getDestinationsAdapter } from "../adapter/getDestinationsAdapter";
import type { Destination, DestinationName } from "../types";
import { getDataFromJSON } from "../../../services/getDataFromJSON";

export const useDestination = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeDestination, setActiveDestination] = useState<DestinationName>();
  const details = destinations.find(
    (destination) => destination.name === activeDestination
  );

  useEffect(() => {
    const getDestinations = getDestinationsAdapter();

    const getData = async () => {
      try {
        // TODO: The local storage key should be a constant that can be used in multiple places
        // TODO: Duplicate this behavior in the other hooks
        if (localStorage.getItem("isDataRequested") === null) {
          const destinationsJSON = await getDataFromJSON("destinations");
          setDestinations(destinationsJSON);
          setActiveDestination(destinationsJSON[0].name);
        }
        const destinationsData = await getDestinations();
        setDestinations(destinationsData);
        localStorage.setItem("isDataRequested", "true");
        if (activeDestination === undefined) {
          setActiveDestination(destinationsData[0].name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [activeDestination]);

  return {
    destinations,
    details,
    setActiveDestination,
  };
};
