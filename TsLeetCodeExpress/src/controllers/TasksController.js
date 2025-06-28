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
exports.TasksController = void 0;
const TaskMapper_1 = require("./mappers/TaskMapper");
const CreateTaskRequest_1 = require("../services/dto/request/task/CreateTaskRequest");
const UpdateTaskRequest_1 = require("../services/dto/request/task/UpdateTaskRequest");
const DeleteTaskRequest_1 = require("../services/dto/request/task/DeleteTaskRequest");
const ChangeTaskVisibilityRequest_1 = require("../services/dto/request/task/ChangeTaskVisibilityRequest");
class TasksController {
    constructor(_tasksService) {
        this._tasksService = _tasksService;
    }
    getTaskById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllTask = yield this._tasksService.getTaskByIdAsync(Number(req.params.id));
            const apiContractTask = TaskMapper_1.TaskMapper.toApi(bllTask);
            return res.json(apiContractTask);
        });
    }
    getTaskByTitle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllTask = yield this._tasksService.getTaskByTitleAsync(req.params.title);
            const apiContractTask = TaskMapper_1.TaskMapper.toApi(bllTask);
            return res.json(apiContractTask);
        });
    }
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new CreateTaskRequest_1.CreateTaskRequest(apiReq.title, apiReq.description, apiReq.taskComplexityId, apiReq.isVisible);
            const createdTaskId = yield this._tasksService.createTaskAsync(bllReq);
            return res.json(createdTaskId);
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new UpdateTaskRequest_1.UpdateTaskRequest(apiReq.id, apiReq.title, apiReq.description, apiReq.taskComplexityId, apiReq.isVisible);
            const bllRes = yield this._tasksService.updateTaskAsync(bllReq);
            return res.json(TaskMapper_1.TaskMapper.toApi(bllRes));
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new DeleteTaskRequest_1.DeleteTaskRequest(apiReq.id);
            yield this._tasksService.deleteTaskAsync(bllReq);
            return res.json(bllReq.id);
        });
    }
    changeTaskVisibility(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new ChangeTaskVisibilityRequest_1.ChangeTaskVisibilityRequest(apiReq.id, apiReq.isVisible);
            yield this._tasksService.changeTaskVisibilityAsync(bllReq);
            return res.json(bllReq.id);
        });
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=TasksController.js.map