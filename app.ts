import "reflect-metadata"; // 4 typeOrm. globally.
import { IUsersRepository } from "./src/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "./src/repositories/UsersRepository";
import { ITasksRepository } from "./src/repositories/interfaces/ITasksRepository";
import { TasksRepository } from "./src/repositories/TasksRepository";
import { IUsersService } from "./src/services/interfaces/IUsersService";
import { UsersService } from "./src/services/UsersService";
import { ITasksService } from "./src/services/interfaces/ITasksService";
import { TasksService } from "./src/services/TasksService";
import express, { ErrorRequestHandler, Express } from 'express';
import { registerUsersRoutes } from "./src/routes/UsersRoutes";
import { UsersController } from "./src/controllers/UsersController";
import bodyParser from "body-parser";

import { InitDataSource } from "./src/db/index";

import { Container } from 'inversify';

import swaggerUi from "swagger-ui-express";
import { DataSourceInfoDTO } from "./src/db/DataSourceInitDTO";
import { DbHealthCheck } from "./src/healthz/dbHealthCheck";
import { HealthService } from "./src/healthz/health-service";
import { ResourceHealth } from "./src/healthz/health-indicator";
import { DataSource } from "typeorm";
import { ConsoleLogger, ILogger } from "./src/logger/loggers";

import helmet from "helmet";
import cors, { CorsOptions } from "cors";

import morgan from "morgan";

import { errorHandler } from "./src/middlewares/errorHandler";
import { EnvVarsHelper } from "./src/helpers/envVarsHelper";
import { swagger } from "./src/swaggerOutput";

const corsOptions: CorsOptions = {
    origin: `${EnvVarsHelper.getEnv("ssl")}://${EnvVarsHelper.getEnv("host")}:${EnvVarsHelper.getEnv("port")}`
};

//DI-container:
const diContainer = new Container();

const appDataSource = InitDataSource
    (new DataSourceInfoDTO
        (EnvVarsHelper.getEnv("dbHost"), EnvVarsHelper.getEnv("dbHost"), Number(EnvVarsHelper.getEnv("dbPort")), EnvVarsHelper.getEnv("dbUserName"),
            EnvVarsHelper.getEnv("dbPassword"), EnvVarsHelper.getEnv("dbName"), Boolean(EnvVarsHelper.getEnv("dbSynchronize")), Boolean(EnvVarsHelper.getEnv("dbLogging")))
    );

diContainer.bind<DataSource>('DataSource').toConstantValue(appDataSource);
diContainer.bind<IUsersRepository>('IUsersRepository').to(UsersRepository);
diContainer.bind<ITasksRepository>('ITasksRepository').to(TasksRepository);
diContainer.bind<IUsersService>('IUsersService').to(UsersService);
diContainer.bind<ITasksService>('ITasksService').to(TasksService);
diContainer.bind<ILogger>('ILogger').to(ConsoleLogger);

const usersController = new UsersController(diContainer.get('IUsersService'), diContainer.get('ILogger'));

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(helmet()); // Security headers
app.use(morgan("combined")); // Logging
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

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

const userRouter = registerUsersRoutes(usersController);

//// To view routes on the userRouter:
//userRouter.stack.forEach((middleware: any) => {
//    if (middleware.route) {
//        console.log(`Path: ${middleware.route.path}, Method: ${Object.keys(middleware.route.methods).join(', ').toUpperCase()}`);
//    }
//});

app.use('/api', userRouter);
//app.use('/api/tasks',);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swagger(EnvVarsHelper.getEnv('host'), Number(EnvVarsHelper.getEnv('port'))), {
        explorer: true,
        customSiteTitle: 'My API Docs'
    })
);

const PORT = Number(EnvVarsHelper.getEnv("port"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Application started on ${PORT}`));