// TODO: Remove this file and use types from src/services/types.ts
import { ImagesFormat } from "../../types/types";

export interface CrewMember {
  name: string;
  images: ImagesFormat;
  role: string;
  bio: string;
}
