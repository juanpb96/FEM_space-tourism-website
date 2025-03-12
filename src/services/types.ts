export interface SpaceTourismData {
  destinations: Destination[];
  crew: Crew[];
  technology: Technology[];
}

export type Pages = keyof SpaceTourismData;

export interface Crew {
  name: string;
  images: ImageFormat;
  role: string;
  bio: string;
}

export interface ImageFormat {
  png: string;
  webp: string;
}

export interface Destination {
  name: string;
  images: ImageFormat;
  description: string;
  distance: string;
  travel: string;
}

export interface Technology {
  name: string;
  images: ImageOrientation;
  description: string;
}

export interface ImageOrientation {
  portrait: string;
  landscape: string;
}
