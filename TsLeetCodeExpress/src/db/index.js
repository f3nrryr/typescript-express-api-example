"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../db/User");
const Task_1 = require("./Task");
const TaskComplexity_1 = require("./TaskComplexity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "1234",
    database: "TsLeetCodeExpress",
    entities: [User_1.User, Task_1.Task, TaskComplexity_1.TaskComplexity],
    synchronize: true,
    logging: false
});
//# sourceMappingURL=index.js.map