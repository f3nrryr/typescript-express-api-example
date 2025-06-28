import { Request, Response, NextFunction } from 'express';
import { ITasksService } from "../services/interfaces/ITasksService";
import { Task } from "./contractsDTOs/Task";
import { TaskMapper } from "./mappers/TaskMapper";

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

        const bllTask = TaskMapper.toBLL(req.body);

        const createdTaskId = await this._tasksService.createTaskAsync(bllTask);

        return res.json(createdTaskId);
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {

        const bllTask = TaskMapper.toBLL(req.body);

        await this._tasksService.updateTaskAsync(bllTask);

        return res.json(req.body);
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {

        const bllTask = TaskMapper.toBLL(req.body);

        await this._tasksService.deleteTaskAsync(bllTask);

        return res.json(req.body);
    }
}