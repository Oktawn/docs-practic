import { PracticsStyleEnum, PracticsTypeEnum } from "../enums/practics.enum";

type DocsIZType = {
  fullName: string;
  shortFullName?: string;
  profileType: ProfileStudyingType;
  profile: string;
  specialization: string;
  groups: string;
  practicStyle: PracticsStyleEnum;
  practicType: PracticsTypeEnum;
  dateStart: string;
  dateEnd: string;
  universityMentor: string;
  orgPracticeLeader: string;
  orgName?: string;
  orgPosition?: string;
  uniDivisionManager?: string;
  isVUZ: boolean;
}

type ProfileStudyingType = "bachelor" | "magistracy";


export {
  DocsIZType,
  ProfileStudyingType
}