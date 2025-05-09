import { DataSource } from 'typeorm';
import { envConfig } from './config/env.config';
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envConfig.get("DB_HOST"),
  port: Number(envConfig.get("DB_PORT")),
  username: envConfig.get("DB_USERNAME"),
  password: envConfig.get("DB_PASSWORD"),
  database: envConfig.get("DB_DATABASE"),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  cache: {
    duration: 10000
  },
});