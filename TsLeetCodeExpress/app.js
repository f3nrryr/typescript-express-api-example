"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // ��� typeOrm. ��������� � ���� ���������� ���������.
const UsersRepository_1 = require("./src/repositories/UsersRepository");
const TasksRepository_1 = require("./src/repositories/TasksRepository");
const UsersService_1 = require("./src/services/UsersService");
const TasksService_1 = require("./src/services/TasksService");
const express_1 = __importDefault(require("express"));
const UsersRoutes_1 = require("./src/routes/UsersRoutes");
const UsersController_1 = require("./src/controllers/UsersController");
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_1 = require("inversify");
const swagger_1 = require("./src/swagger"); // ��� ������� (�������, ��� ����).
const diContainer = new inversify_1.Container();
diContainer.bind('IUsersRepository').to(UsersRepository_1.UsersRepository);
diContainer.bind('ITasksRepository').to(TasksRepository_1.TasksRepository);
diContainer.bind('IUsersService').to(UsersService_1.UsersService);
diContainer.bind('ITasksService').to(TasksService_1.TasksService);
const usersController = new UsersController_1.UsersController(diContainer.get('IUsersService'));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/users', (0, UsersRoutes_1.createUsersRouter)(usersController));
//app.use('/api/tasks',);
(0, swagger_1.setupSwagger)(app);
const PORT = 8082;
app.listen(PORT, () => console.log(`Application started on ${PORT}`));
//# sourceMappingURL=app.js.map