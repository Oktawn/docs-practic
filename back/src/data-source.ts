import { DataSource } from 'typeorm';
import { envConfig } from './config/env.config';
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: Number(envConfig.get("DB_EXTERNAL_PORT")),
  username: envConfig.get("DB_USERNAME"),
  password: envConfig.get("DB_PASSWORD"),
  database: envConfig.get("DB_DATABASE"),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  cache: {
    duration: 10000
  },
});