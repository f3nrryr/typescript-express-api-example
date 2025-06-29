import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../db/entities/User";
import { Task } from "./entities/Task";
import { TaskComplexity } from "./entities/TaskComplexity";
import { DataSourceInfoDTO } from "./DataSourceInitDTO";

export let AppDataSource: DataSource;

export const InitDataSource = (dsInfoDTO: DataSourceInfoDTO): DataSource => {

    AppDataSource = new DataSource({
        type: "postgres",
        host: dsInfoDTO.DbHost,
        port: dsInfoDTO.DbPort,
        username: dsInfoDTO.DbUserName,
        password: dsInfoDTO.DbPassword,
        database: dsInfoDTO.DbName,
        entities: [User, Task, TaskComplexity],
        synchronize: dsInfoDTO.DbSynchronize,
        logging: dsInfoDTO.DbLogging
    });

    AppDataSource.initialize();

    return AppDataSource;
};