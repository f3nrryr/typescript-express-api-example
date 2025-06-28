"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMapper = void 0;
const Task_1 = require("../dto/Task");
const UserMapper_1 = require("./UserMapper");
class TaskMapper {
    static toBLL(task) {
        const solvedByMapped = task.solvedBy.map(UserMapper_1.UserMapper.toBLL);
        return new Task_1.Task(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }
    static toRepo(task) {
        const solvedByMapped = task.solvedBy.map(UserMapper_1.UserMapper.toRepo);
        return new Task_1.Task(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }
}
exports.TaskMapper = TaskMapper;
//# sourceMappingURL=TaskMapper.js.map