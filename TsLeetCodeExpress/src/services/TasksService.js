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
const ChangeTaskVisibilityDTO_1 = require("../repositories/dto/in/task/ChangeTaskVisibilityDTO");
const CreateTaskDTO_1 = require("../repositories/dto/in/task/CreateTaskDTO");
const DeleteTaskDTO_1 = require("../repositories/dto/in/task/DeleteTaskDTO");
const UpdateTaskDTO_1 = require("../repositories/dto/in/task/UpdateTaskDTO");
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
            const createTaskRepo = new CreateTaskDTO_1.CreateTaskDTO(task.title, task.description, task.taskComplexityId, task.isVisible);
            return yield this._tasksRepository.createTaskAsync(createTaskRepo);
        });
    }
    updateTaskAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateTaskRepo = new UpdateTaskDTO_1.UpdateTaskDTO(task.id, task.title, task.description, task.taskComplexityId, task.isVisible);
            const updatedTaskRepo = yield this._tasksRepository.updateTaskAsync(updateTaskRepo);
            return TaskMapper_1.TaskMapper.toBLL(updatedTaskRepo);
        });
    }
    deleteTaskAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteTaskRepo = new DeleteTaskDTO_1.DeleteTaskDTO(task.id);
            yield this._tasksRepository.deleteTaskAsync(deleteTaskRepo);
            return task.id;
        });
    }
    changeTaskVisibilityAsync(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeTaskVisibilityRepo = new ChangeTaskVisibilityDTO_1.ChangeTaskVisibilityDTO(task.id, task.isVisible);
            yield this._tasksRepository.changeTaskVisibilityAsync(changeTaskVisibilityRepo);
            return task.id;
        });
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=TasksService.js.map