import { PracticsStyleEnum, PracticsTypeEnum } from "../enums/practics.enum";
import { ProfileStudyingType } from "../types/types";

interface IAreasStudying {
  profile: string;
  specialization: string;
  type: ProfileStudyingType;
}

interface IStudentPractic {
  id: number;
  fullName: string;
  profileType: ProfileStudyingType;
  profile: string;
  specialization: string;
  groups: string;
  kyrs: string;
  practicStyle: PracticsStyleEnum;
  practicType: PracticsTypeEnum;
  dateStart: string;
  dateEnd: string;
}


export {
  IAreasStudying,
  IStudentPractic
}