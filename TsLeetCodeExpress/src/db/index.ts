import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../db/User"
import { Task } from "./Task"
import { TaskComplexity } from "./TaskComplexity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "1234",
    database: "TsLeetCodeExpress",
    entities: [User, Task, TaskComplexity],
    synchronize: true,
    logging: false
});
