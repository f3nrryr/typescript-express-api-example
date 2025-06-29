"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../db/entities/User");
const Task_1 = require("./entities/Task");
const TaskComplexity_1 = require("./entities/TaskComplexity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "TsLeetCodeExpress",
    entities: [User_1.User, Task_1.Task, TaskComplexity_1.TaskComplexity],
    synchronize: true,
    logging: true
});
//# sourceMappingURL=index.js.map