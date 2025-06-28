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
            const bllTask = TaskMapper_1.TaskMapper.toBLL(req.body);
            const createdTaskId = yield this._tasksService.createTaskAsync(bllTask);
            return res.json(createdTaskId);
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllTask = TaskMapper_1.TaskMapper.toBLL(req.body);
            yield this._tasksService.updateTaskAsync(bllTask);
            return res.json(req.body);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllTask = TaskMapper_1.TaskMapper.toBLL(req.body);
            yield this._tasksService.deleteTaskAsync(bllTask);
            return res.json(req.body);
        });
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=TasksController.js.map