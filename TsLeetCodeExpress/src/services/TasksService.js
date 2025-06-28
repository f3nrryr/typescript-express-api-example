"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const TasksRepository_1 = require("../repositories/TasksRepository");
const TaskMapper_1 = require("./mappers/TaskMapper");
const inversify_1 = require("inversify");
let TasksService = class TasksService {
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, inject(TasksRepository_1.TasksRepository)),
    __metadata("design:paramtypes", [Object])
], TasksService);
function inject(TasksRepository) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=TasksService.js.map