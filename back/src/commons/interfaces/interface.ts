import { ProfileStudyingType } from "../types/types";

interface IAreasStudying {
  profile: string;
  specialization: string;
  type: ProfileStudyingType;
}

interface IStudentsProfile {
  id: string;
  fullName: string;
  
}

export {
  IAreasStudying
}