import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
  uuidExtension: "uuid-ossp",
});
