"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const dbHealthCheck_1 = require("./src/healthz/dbHealthCheck");
const health_service_1 = require("./src/healthz/health-service");
const health_indicator_1 = require("./src/healthz/health-indicator");
const loggers_1 = require("./src/logger/loggers");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./src/middlewares/errorHandler");
(0, dotenv_1.config)({ path: "./.env" });
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
const corsOptions = {
    origin: `http://localhost:${getEnv("port")}`
};
//DI-container:
const diContainer = new inversify_1.Container();
const appDataSource = (0, index_1.InitDataSource)(new DataSourceInitDTO_1.DataSourceInfoDTO(getEnv("dbHost"), getEnv("dbHost"), Number(getEnv("dbPort")), getEnv("dbUserName"), getEnv("dbPassword"), getEnv("dbName"), Boolean(getEnv("dbSynchronize")), Boolean(getEnv("dbLogging")))); // ����� ����� ����� ��������� �� ���������.
diContainer.bind('DataSource').toConstantValue(appDataSource);
diContainer.bind('IUsersRepository').to(UsersRepository_1.UsersRepository);
diContainer.bind('ITasksRepository').to(TasksRepository_1.TasksRepository);
diContainer.bind('IUsersService').to(UsersService_1.UsersService);
diContainer.bind('ITasksService').to(TasksService_1.TasksService);
diContainer.bind('ILogger').to(loggers_1.ConsoleLogger);
const usersController = new UsersController_1.UsersController(diContainer.get('IUsersService'), diContainer.get('ILogger'));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("combined")); // Logging
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
//HEALTHCHECK:
app.use('/healthz', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthService = new health_service_1.HealthService([
        new dbHealthCheck_1.DbHealthCheck(diContainer.get('DataSource'))
    ]);
    const healthResults = yield healthService.getHealth();
    res.status(healthResults.status === health_indicator_1.ResourceHealth.Healthy ? 200 : 500)
        .json(healthResults); // Use .json() instead of .send()
}));
const userRouter = (0, UsersRoutes_1.registerUsersRoutes)(usersController);
//// To view routes on the userRouter:
//userRouter.stack.forEach((middleware: any) => {
//    if (middleware.route) {
//        console.log(`Path: ${middleware.route.path}, Method: ${Object.keys(middleware.route.methods).join(', ').toUpperCase()}`);
//    }
//});
app.use('/api', userRouter);
//app.use('/api/tasks',);
//SWAGGER:
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOutput_1.swagger));
const PORT = Number(getEnv("port"));
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => console.log(`Application started on ${PORT}`));
//# sourceMappingURL=app.js.map