import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "postgres",
  password: "docker",
  database: "Jest",
  synchronize: false,
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
  uuidExtension: "uuid-ossp",
});
