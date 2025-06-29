"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEnv;
require("reflect-metadata"); // ��� typeOrm. ��������� � ���� ���������� ���������.
const UsersRepository_1 = require("./src/repositories/UsersRepository");
const TasksRepository_1 = require("./src/repositories/TasksRepository");
const UsersService_1 = require("./src/services/UsersService");
const TasksService_1 = require("./src/services/TasksService");
const express_1 = __importDefault(require("express"));
const UsersRoutes_1 = require("./src/routes/UsersRoutes");
const UsersController_1 = require("./src/controllers/UsersController");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const index_1 = require("./src/db/index");
const inversify_1 = require("inversify");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOutput_1 = require("./src/swaggerOutput");
const DataSourceInitDTO_1 = require("./src/db/DataSourceInitDTO");
(0, dotenv_1.config)({ path: "./.env" });
const diContainer = new inversify_1.Container();
const envVars = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV,
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD, // todo: ��-��������, ���� ���������, �� ��� ���-������� too much.
    dbName: process.env.DB_NAME,
    dbSynchronize: process.env.DB_SYNCHRONIZE,
    dbLogging: process.env.DB_LOGGING
};
function getEnv(varName) {
    if (typeof envVars[varName] === "undefined") {
        console.error(`'${varName}' is not available`);
        process.exit(1);
    }
    else {
        return envVars[varName];
    }
}
const appDataSource = (0, index_1.InitDataSource)(new DataSourceInitDTO_1.DataSourceInfoDTO(getEnv("dbHost"), getEnv("dbHost"), Number(getEnv("dbPort")), getEnv("dbUserName"), getEnv("dbPassword"), getEnv("dbName"), Boolean(getEnv("dbSynchronize")), Boolean(getEnv("dbLogging")))); // ����� ����� ����� ��������� �� ���������.
diContainer.bind('IUsersRepository').to(UsersRepository_1.UsersRepository);
diContainer.bind('ITasksRepository').to(TasksRepository_1.TasksRepository);
diContainer.bind('IUsersService').to(UsersService_1.UsersService);
diContainer.bind('ITasksService').to(TasksService_1.TasksService);
const usersController = new UsersController_1.UsersController(diContainer.get('IUsersService'));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/users', (0, UsersRoutes_1.registerUsersRoutes)(usersController));
//app.use('/api/tasks',);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOutput_1.swagger));
const PORT = 8082;
app.listen(PORT, () => console.log(`Application started on ${PORT}`));
//# sourceMappingURL=app.js.map