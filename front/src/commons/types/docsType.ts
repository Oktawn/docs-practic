import type { PracticsStyleEnum, PracticsTypeEnum } from "./practicsType";

type DocsInVUZType = {
  fullName: string;
  shortFullName?: string;
  profileType: ProfileStudyingType;
  profile: string;
  specialization: string;
  groups: string;
  kyrs: string;
  practicStyle: PracticsStyleEnum;
  practicType: PracticsTypeEnum;
  dateStart: string;
  dateEnd: string;
  isVUZ: boolean;
  universityMentor: string;
  orgPracticeLeader: string;
  orgPosition: string;
  uniDivisionManager?: string;
}

type DocsWithoutVUZType = DocsInVUZType & {
  orgName: string;
  ystav:string;
  fullNameOrganiration: string;
  postDirector: string;
  directorFullName: string;
  shortDirector?: string;
  addressOrganization: string;
  INN: string;
  KPP: string;
  OGRN: string;
  orgPhone: string;
  orgEmail: string;
}



type ProfileStudyingType = "bachelor" | "magistracy";


export type {
  DocsInVUZType,
  DocsWithoutVUZType,
  ProfileStudyingType
}