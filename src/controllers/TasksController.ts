import { Request, Response, NextFunction } from 'express';
import { ITasksService } from "../services/interfaces/ITasksService";
import { TaskMapper } from "./mappers/TaskMapper";

import { CreateTaskRequest as ApiCreateRequest } from '../services/dto/request/task/CreateTaskRequest';
import { CreateTaskRequest as BllCreateRequest } from "../services/dto/request/task/CreateTaskRequest";
import { UpdateTaskRequest as ApiUpdateRequest } from './contractsDTOs/req/task/UpdateTaskRequest';
import { UpdateTaskRequest as BllUpdateRequest } from "../services/dto/request/task/UpdateTaskRequest";
import { DeleteTaskRequest as ApiDeleteRequest } from './contractsDTOs/req/task/DeleteTaskRequest';
import { DeleteTaskRequest as BllDeleteRequest } from "../services/dto/request/task/DeleteTaskRequest";

import { ChangeTaskVisibilityRequest as ApiChangeIsVisRequest } from './contractsDTOs/req/task/ChangeTaskVisibilityRequest';
import { ChangeTaskVisibilityRequest as BllChangeIsVisRequest } from "../services/dto/request/task/ChangeTaskVisibilityRequest";

export class TasksController {

    constructor(private _tasksService: ITasksService) { }

    async getTaskById(req: Request, res: Response, next: NextFunction) {

        const bllTask = await this._tasksService.getTaskByIdAsync(Number(req.params.id));

        const apiContractTask = TaskMapper.toApi(bllTask);

        return res.json(apiContractTask);
    }

    async getTaskByTitle(req: Request, res: Response, next: NextFunction) {

        const bllTask = await this._tasksService.getTaskByTitleAsync(req.params.title);

        const apiContractTask = TaskMapper.toApi(bllTask);

        return res.json(apiContractTask);
    }

    async createTask(req: Request, res: Response, next: NextFunction) {

        const apiReq: ApiCreateRequest = req.body

        const bllReq = new BllCreateRequest(apiReq.title, apiReq.description, apiReq.taskComplexityId, apiReq.isVisible);

        const createdTaskId = await this._tasksService.createTaskAsync(bllReq);

        return res.json(createdTaskId);
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {

        const apiReq: ApiUpdateRequest = req.body

        const bllReq = new BllUpdateRequest(apiReq.id, apiReq.title, apiReq.description, apiReq.taskComplexityId, apiReq.isVisible);

        const bllRes = await this._tasksService.updateTaskAsync(bllReq);

        return res.json(TaskMapper.toApi(bllRes));
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {

        const apiReq: ApiDeleteRequest = req.body

        const bllReq = new BllDeleteRequest(apiReq.id);

        await this._tasksService.deleteTaskAsync(bllReq);

        return res.json(bllReq.id);
    }

    async changeTaskVisibility(req: Request, res: Response, next: NextFunction) {

        const apiReq: ApiChangeIsVisRequest = req.body

        const bllReq = new BllChangeIsVisRequest(apiReq.id, apiReq.isVisible);

        await this._tasksService.changeTaskVisibilityAsync(bllReq);

        return res.json(bllReq.id);

    }
}