import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../db/entities/User"
import { Task } from "./entities/Task"
import { TaskComplexity } from "./entities/TaskComplexity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "TsLeetCodeExpress",
    entities: [User, Task, TaskComplexity],
    synchronize: true,
    logging: true
});
