import "reflect-metadata"; // ƒл€ typeOrm. »мпортить в доке предлагают √ЋќЅјЋ№Ќќ.
import { DIContainer } from '@wessberg/di';
import { IUsersRepository } from "./src/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "./src/repositories/UsersRepository";
import { ITasksRepository } from "./src/repositories/interfaces/ITasksRepository";
import { TasksRepository } from "./src/repositories/TasksRepository";
import { IUsersService } from "./src/services/interfaces/IUsersService";
import { UsersService } from "./src/services/UsersService";
import { ITasksService } from "./src/services/interfaces/ITasksService";
import { TasksService } from "./src/services/TasksService";
import express, { Express } from 'express';
import { createUsersRouter } from "./src/routes/UsersRoutes";
import { UsersController } from "./src/controllers/UsersController";

const diContainer = new DIContainer();

diContainer.registerTransient<IUsersRepository, UsersRepository>();
diContainer.registerTransient<ITasksRepository, TasksRepository>();
diContainer.registerTransient<IUsersService, UsersService>();
diContainer.registerTransient<ITasksService, TasksService>();

const usersController = new UsersController(diContainer.get<IUsersService>());

//TODO: START APP + log decorator (req + res) + err-handler middleware + swagger + comments (api) + tests. cfg через конф. файл или .env.

const app = express();

app.use('/api/users', createUsersRouter(usersController));
app.use('/api/tasks',);