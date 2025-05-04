import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { envConfig } from './config/env.config';
import { DocsWorksService } from './docsAction/docsWorks.service';

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

