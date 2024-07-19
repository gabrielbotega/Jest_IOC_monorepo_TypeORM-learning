import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, "database/entities/*.ts")],
  migrations: [join(__dirname, "database/migrations/*.ts")],
  subscribers: [],
  uuidExtension: "uuid-ossp",
});
