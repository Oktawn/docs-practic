import { PracticsStyleEnum, PracticsTypeEnum } from "../enums/practics.enum";

type DocsIZType = {
  fullName: string;
  profile: string;
  specialization: string;
  groups: string;
  practicStyle: PracticsStyleEnum;
  practicType: PracticsTypeEnum;
  dateStart: string;
  dateEnd: string;
  universityMentor: string;
  orgPracticeLeader: string;
  uniDivisionManager: string;
  isVUZ: boolean;
}


export {
  DocsIZType,
}