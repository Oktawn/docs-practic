import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { envConfig } from './config/env.config';
import { DocsWorksService } from './docsAction/docsWorks.service';
import { PracticsStyleEnum, PracticsTypeEnum } from './commons/enums/practics.enum';

const app = express();
const port = envConfig.get("API_PORT") || 3000;

// Middlewares
app.use(cors());
app.use(express.json());


// Database connection and server start
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Соединение с базой данных установлено');

//     app.listen(port, () => {
//       console.log(`Сервер запущен на порту ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Ошибка при инициализации соединения с базой данных', err);
//   });


const test = new DocsWorksService();
test.getDocumentsInVUZ({
  fullName: "Иванов Иван Иванович",
  profileType: "bachelor",
  profile: "Программная инженерия",
  specialization: "Информационные технологии",
  groups: "Группа 1",
  practicStyle: PracticsStyleEnum.PR,
  practicType: PracticsTypeEnum.TECH,
  dateStart: "2023-06-01",
  dateEnd: "2023-08-31",
  isVUZ: true,
  universityMentor: "Петров Петр Петрович",
  orgPracticeLeader: "Сидоров Сидор Сидорович"
})
