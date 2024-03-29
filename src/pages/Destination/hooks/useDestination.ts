import { useEffect, useState } from "react";
import { getDestinationsAdapter } from "../adapter/getDestinationsAdapter";
import type { Destination, DestinationName } from '../types';
import { defaultDestination } from "../constants/destination";

export const useDestination = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeDestination, setActiveDestination] = useState<DestinationName>();
  const details = destinations.find(destination => destination.name === activeDestination) || defaultDestination;
  
  useEffect(() => {
    const getDestinations = getDestinationsAdapter();

    const getData = async () => {
      try {
        const destinationsData = await getDestinations();
        setDestinations(destinationsData);
        setActiveDestination(destinationsData[0].name);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [])
  
  return {
    destinations,
    details,
    setActiveDestination
  };
}
