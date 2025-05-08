import { IAreasStudying } from "../interfaces/interface";
import { ProfileStudyingType } from "../types/types";

export var data: IAreasStudying[] = [
  {
    profile: "01.03.02 Прикладная математика и информатика",
    specialization: "Прикладное программирование и компьютерные технологии",
    type: "bachelor"
  },
  {
    profile: "09.03.01 Информатика и вычислительная техника",
    specialization: "Автоматизированные системы обработки информации и управления",
    type: "bachelor"
  },
  {
    profile: "09.03.01 Информатика и вычислительная техника",
    specialization: "Информационная безопасность компьютерных систем и сетей",
    type: "bachelor"
  },
  {
    profile: "09.03.02 Информационные системы и технологии",
    specialization: `Информационные системы и технологии в геологии и нефтегазовой отрасли;Информационные системы и технологии; Интеллектуальные системы и технологии «Умный город»`,
    type: "bachelor",
  },
  {
    profile: "09.03.02 Информационные системы и технологии",
    specialization: "Искусственный интеллект и программирование",
    type: "bachelor",
  },
  {
    profile: "38.03.05 Бизнес-информатика",
    "specialization": "Информационные системы предприятия",
    type: "bachelor"
  },
  {
    profile: "01.04.02 Прикладная математика и информатика",
    specialization: "Машинное обучение и анализ данных",
    type: "magistracy"
  },
  {
    profile: "09.04.01 Информатика и вычислительная техника",
    specialization: "Нейросетевые технологии в автоматизированных системах управления",
    type: "magistracy"
  },
  {
    profile: "09.04.02 Информационные системы и технологии",
    specialization: "Искусственный интеллект в промышленности; Интеллектуальные технологии «Умный город»",
    type: "magistracy"
  },
]

export function getDataByType(type: ProfileStudyingType) {
  return data.filter((item) => item.type === type);
}

export function getDataByProfile(filterData: IAreasStudying[]) {
  return filterData.filter((item, index, self) => self.indexOf(item) === index);
}

export function getDataBySpecialization(filterData: IAreasStudying[]) {
  return filterData.filter((item, index, self) => self.indexOf(item) === index);
}