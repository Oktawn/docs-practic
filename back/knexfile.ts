import type { Knex } from "knex";
import { envConfig } from "./src/config/env.config";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: envConfig.get("DB_DATABASE"),
      user: envConfig.get('DB_USERNAME'),
      password: envConfig.get("DB_PASSWORD"),
      port: Number(envConfig.get('DB_EXTERNAL_PORT'))
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: envConfig.get("DB_DATABASE"),
      user: envConfig.get('DB_USERNAME'),
      password: envConfig.get("DB_PASSWORD"),
      port: Number(envConfig.get('DB_EXTERNAL_PORT'))
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  }

};

module.exports = config;

export default config;
