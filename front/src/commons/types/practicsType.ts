export const PracticsStyle = {
  PR: "Производственная",
}

type PracticsStyleEnum = keyof typeof PracticsStyle;

export const PracticsType = {
  STUDY: "Учебная",
  TECH: "Технологическая (проектно-технологическая)",
  DIPLOM: "Преддипломная"
}
type PracticsTypeEnum = keyof typeof PracticsType;

export type {
  PracticsStyleEnum,
  PracticsTypeEnum,
}