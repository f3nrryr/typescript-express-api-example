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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const CustomError_1 = require("../repoAndBLL/CustomError");
const TaskMapper_1 = require("./mappers/TaskMapper");
class TasksService {
    constructor(_tasksRepository) {
        this._tasksRepository = _tasksRepository;
    }
    getTaskByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTask = yield this._tasksRepository.getTaskByIdAsync(id);
            if (repoTask == null)
                throw new CustomError_1.CustomError('Not found', `Task not found by id: ${id}`, 404, null);
            const bllTask = TaskMapper_1.TaskMapper.toBLL(repoTask);
            return bllTask;
        });
    }
    getTaskByTitleAsync(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTask = yield this._tasksRepository.getTaskByTitleAsync(title);
            if (repoTask == null)
                throw new CustomError_1.CustomError('Not found', `Task not found by title: ${title}`, 404, null);
            const bllTask = TaskMapper_1.TaskMapper.toBLL(repoTask);
            return bllTask;
        });
    }
    createTaskAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTask = TaskMapper_1.TaskMapper.toRepo(task);
            return yield this._tasksRepository.createTaskAsync(repoTask);
        });
    }
    updateTaskAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTask = TaskMapper_1.TaskMapper.toRepo(task);
            yield this._tasksRepository.updateTaskAsync(repoTask);
            return task;
        });
    }
    deleteTaskAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTask = TaskMapper_1.TaskMapper.toRepo(task);
            yield this._tasksRepository.deleteTaskAsync(repoTask);
            return task;
        });
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=TasksService.js.map