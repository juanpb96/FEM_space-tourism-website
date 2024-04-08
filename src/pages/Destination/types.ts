export type DestinationName = 'Moon' | 'Mars' | 'Europa' | 'Titan';

export interface ImagesFormat {
  png:  string;
  webp: string;
}

export interface Destination {
  name:        DestinationName;
  images:      ImagesFormat;
  description: string;
  distance:    string;
  travel:      string;
}

export interface Destinations {
  destinations: Destination[];
}