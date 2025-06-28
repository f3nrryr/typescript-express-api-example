"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMapper = void 0;
const Task_1 = require("../../services/dto/Task");
const Task_2 = require("../contractsDTOs/Task");
const UserMapper_1 = require("./UserMapper");
class TaskMapper {
    static toApi(task) {
        const solvedByMapped = task.solvedBy.map(UserMapper_1.UserMapper.toApi);
        return new Task_2.Task(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }
    static toBLL(task) {
        const solvedByMapped = task.solvedBy.map(UserMapper_1.UserMapper.toBLL);
        return new Task_1.Task(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }
}
exports.TaskMapper = TaskMapper;
//# sourceMappingURL=TaskMapper.js.map