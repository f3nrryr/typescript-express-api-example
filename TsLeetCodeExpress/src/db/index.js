"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDataSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../db/entities/User");
const Task_1 = require("./entities/Task");
const TaskComplexity_1 = require("./entities/TaskComplexity");
const InitDataSource = (dsInfoDTO) => {
    exports.AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        host: dsInfoDTO.DbHost,
        port: dsInfoDTO.DbPort,
        username: dsInfoDTO.DbUserName,
        password: dsInfoDTO.DbPassword,
        database: dsInfoDTO.DbName,
        entities: [User_1.User, Task_1.Task, TaskComplexity_1.TaskComplexity],
        synchronize: dsInfoDTO.DbSynchronize,
        logging: dsInfoDTO.DbLogging
    });
    return exports.AppDataSource;
};
exports.InitDataSource = InitDataSource;
//# sourceMappingURL=index.js.map