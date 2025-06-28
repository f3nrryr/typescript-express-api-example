"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // ��� typeOrm. ��������� � ���� ���������� ���������.
const di_1 = require("@wessberg/di");
const express_1 = __importDefault(require("express"));
const UsersRoutes_1 = require("./src/routes/UsersRoutes");
const UsersController_1 = require("./src/controllers/UsersController");
const diContainer = new di_1.DIContainer();
diContainer.registerTransient();
diContainer.registerTransient();
diContainer.registerTransient();
diContainer.registerTransient();
const usersController = new UsersController_1.UsersController(diContainer.get());
//TODO: START APP + log decorator (req + res) + err-handler middleware + swagger + comments (api) + tests. cfg ����� ����. ���� ��� .env.
const app = (0, express_1.default)();
app.use('/api/users', (0, UsersRoutes_1.createUsersRouter)(usersController));
app.use('/api/tasks');
//# sourceMappingURL=app.js.map