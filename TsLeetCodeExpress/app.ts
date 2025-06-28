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
import { createUsersRouter } from "./src/routes/UsersRoutes";
import { UsersController } from "./src/controllers/UsersController";
import bodyParser from "body-parser";

import { Container, inject, injectable } from 'inversify';



const diContainer = new Container();

diContainer.bind<IUsersRepository>('IUsersRepository').to(UsersRepository);
diContainer.bind<ITasksRepository>('ITasksRepository').to(TasksRepository);
diContainer.bind<IUsersService>('IUsersService').to(UsersService);
diContainer.bind<ITasksService>('ITasksService').to(TasksService);

const usersController = new UsersController(diContainer.get(UsersService));

const app = express();

app.use(bodyParser.json());

app.use('/api/users', createUsersRouter(usersController));
//app.use('/api/tasks',);

const PORT = 8082;

app.listen(PORT, () => console.log(`Application started on ${PORT}`));
