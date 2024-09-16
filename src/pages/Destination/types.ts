import { ImagesFormat } from "../../types/types";

export type DestinationName = "Moon" | "Mars" | "Europa" | "Titan";

export interface Destination {
  name: DestinationName;
  images: ImagesFormat;
  description: string;
  distance: string;
  travel: string;
}

export interface Destinations {
  destinations: Destination[];
}
