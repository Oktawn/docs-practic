import { config } from "dotenv";
import path from "node:path";

interface IAppConfig {
  API_PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_EXTERNAL_PORT: number;
  DB_PORT: number;
  PATH_DOCS: string;
}

class EnvConfig {
  constructor() {
    const envDev = path.resolve(__dirname, "../../.env");
    const envProd = path.resolve(__dirname, "../../../.env");
    const envPath = envDev || envProd;
    console.log(envPath);
    const { error, parsed } = config({ path: envPath });
    if (error) {
      throw new Error(`Error loading .env file: ${error}`);
    }
    if (!parsed) {
      throw new Error("Error parsing .env file");
    }
  }

  public get(key: (keyof IAppConfig)): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}

export const envConfig = new EnvConfig();