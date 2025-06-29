import "reflect-metadata"; // ƒл€ typeOrm. »мпортить в доке предлагают √ЋќЅјЋ№Ќќ.
import { IUsersRepository } from "./src/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "./src/repositories/UsersRepository";
import { ITasksRepository } from "./src/repositories/interfaces/ITasksRepository";
import { TasksRepository } from "./src/repositories/TasksRepository";
import { IUsersService } from "./src/services/interfaces/IUsersService";
import { UsersService } from "./src/services/UsersService";
import { ITasksService } from "./src/services/interfaces/ITasksService";
import { TasksService } from "./src/services/TasksService";
import express, { Express } from 'express';
import { registerUsersRoutes } from "./src/routes/UsersRoutes";
import { UsersController } from "./src/controllers/UsersController";
import bodyParser from "body-parser";

import { config } from "dotenv";
import { AppDataSource, InitDataSource } from "./src/db/index";

import { Container } from 'inversify';

import swaggerUi from "swagger-ui-express";
import { swagger } from "./src/swaggerOutput";
import { DataSourceInfoDTO } from "./src/db/DataSourceInitDTO";
import { DbHealthCheck } from "./src/healthz/dbHealthCheck";
import { HealthService } from "./src/healthz/health-service";
import { ResourceHealth } from "./src/healthz/health-indicator";
import { DataSource } from "typeorm";
import { ConsoleLogger, ILogger } from "./src/logger/loggers";



config({ path: "./.env" });
const envVars = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV as "development" | "production",
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD, // todo: по-хорошему, надо шифровать, но дл€ пет-проекта too much.
    dbName: process.env.DB_NAME,
    dbSynchronize: process.env.DB_SYNCHRONIZE,
    dbLogging: process.env.DB_LOGGING
};
export default function getEnv(varName: keyof typeof envVars): string {
    if (typeof envVars[varName] === "undefined") {
        console.error(`'${varName}' is not available`);
        process.exit(1);
    } else {
        return envVars[varName] as string;
    }
}

//DI-container:
const diContainer = new Container();

const appDataSource = InitDataSource
    (new DataSourceInfoDTO
        (getEnv("dbHost"), getEnv("dbHost"), Number(getEnv("dbPort")), getEnv("dbUserName"),
         getEnv("dbPassword"), getEnv("dbName"), Boolean(getEnv("dbSynchronize")), Boolean(getEnv("dbLogging")))
    ); // Ќужно иметь ранее созданную бд физически.

diContainer.bind<DataSource>('DataSource').toConstantValue(appDataSource);
diContainer.bind<IUsersRepository>('IUsersRepository').to(UsersRepository);
diContainer.bind<ITasksRepository>('ITasksRepository').to(TasksRepository);
diContainer.bind<IUsersService>('IUsersService').to(UsersService);
diContainer.bind<ITasksService>('ITasksService').to(TasksService);
diContainer.bind<ILogger>('ILogger').to(ConsoleLogger);

const usersController = new UsersController(diContainer.get('IUsersService'), diContainer.get('ILogger'));

const app = express();

app.use(bodyParser.json());

//HEALTHCHECK:
app.use('/healthz', async (req, res) => {
    const healthService = new HealthService(
        [
            new DbHealthCheck(diContainer.get('DataSource'))
        ]
    );

    const healthResults = await healthService.getHealth();

    res.status(healthResults.status === ResourceHealth.Healthy ? 200 : 500)
        .json(healthResults); // Use .json() instead of .send()
});

app.use('/api/users', registerUsersRoutes(usersController));
//app.use('/api/tasks',);

//SWAGGER:
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

const PORT = Number(getEnv("port"));

app.listen(PORT, () => console.log(`Application started on ${PORT}`));