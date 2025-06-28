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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TasksRepository__repository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const index_1 = require("../db/index");
const Task_1 = require("../db/Task");
const TaskMapper_1 = require("./mappers/TaskMapper");
const CustomError_1 = require("../repoAndBLL/CustomError");
class TasksRepository {
    constructor() {
        _TasksRepository__repository.set(this, index_1.AppDataSource.getRepository(Task_1.Task));
    }
    getTaskByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbTask = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").findOneBy({
                id: id
            });
            if (dbTask == null)
                return null;
            const repoTask = TaskMapper_1.TaskMapper.toRepoLayer(dbTask);
            return repoTask;
        });
    }
    getTaskByTitleAsync(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbTask = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").findOneBy({
                title: title
            });
            if (dbTask == null)
                return null;
            const repoTask = TaskMapper_1.TaskMapper.toRepoLayer(dbTask);
            return repoTask;
        });
    }
    createTaskAsync(createTaskDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = __classPrivateFieldGet(this, _TasksRepository__repository, "f").create({
                title: createTaskDTO.title,
                description: createTaskDTO.description,
                taskComplexityId: createTaskDTO.taskComplexityId,
                isVisible: createTaskDTO.isVisible,
                createdAt: new Date()
            });
            __classPrivateFieldGet(this, _TasksRepository__repository, "f").save(newTask);
            return newTask.id;
        });
    }
    updateTaskAsync(updateTaskDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskDb = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").findOneBy({
                id: updateTaskDTO.id
            });
            if (taskDb == null)
                throw new CustomError_1.CustomError("Not found", `Task not found in db by id: ${updateTaskDTO.id}`, 404, null);
            taskDb.title = updateTaskDTO.title;
            taskDb.description = updateTaskDTO.description;
            taskDb.taskComplexityId = updateTaskDTO.taskComplexityId;
            taskDb.isVisible = updateTaskDTO.isVisible;
            const savedTaskDb = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").save(taskDb);
            return TaskMapper_1.TaskMapper.toRepoLayer(savedTaskDb);
        });
    }
    deleteTaskAsync(deleteTaskDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").delete({ id: deleteTaskDTO.id });
            return deleteTaskDTO.id;
        });
    }
    changeTaskVisibilityAsync(changeTaskVisibilityDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskDb = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").findOneBy({
                id: changeTaskVisibilityDTO.id
            });
            if (taskDb == null)
                throw new CustomError_1.CustomError("Not found", `Task not found in db by id: ${changeTaskVisibilityDTO.id}`, 404, null);
            taskDb.isVisible = changeTaskVisibilityDTO.isVisible;
            const savedTaskDb = yield __classPrivateFieldGet(this, _TasksRepository__repository, "f").save(taskDb);
            return savedTaskDb.id;
        });
    }
}
exports.TasksRepository = TasksRepository;
_TasksRepository__repository = new WeakMap();
//# sourceMappingURL=TasksRepository.js.map