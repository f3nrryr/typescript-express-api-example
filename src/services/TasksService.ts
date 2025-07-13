import { CustomError } from "../repoAndBLL/CustomError";
import { ChangeTaskVisibilityDTO } from "../repositories/dto/in/task/ChangeTaskVisibilityDTO";
import { CreateTaskDTO } from "../repositories/dto/in/task/CreateTaskDTO";
import { DeleteTaskDTO } from "../repositories/dto/in/task/DeleteTaskDTO";
import { UpdateTaskDTO } from "../repositories/dto/in/task/UpdateTaskDTO";
import { ITasksRepository } from "../repositories/interfaces/ITasksRepository";
import { ChangeTaskVisibilityRequest } from "./dto/request/task/ChangeTaskVisibilityRequest";
import { CreateTaskRequest } from "./dto/request/task/CreateTaskRequest";
import { DeleteTaskRequest } from "./dto/request/task/DeleteTaskRequest";
import { UpdateTaskRequest } from "./dto/request/task/UpdateTaskRequest";
import { Task } from "./dto/response/Task";
import { ITasksService } from "./interfaces/ITasksService";
import { TaskMapper } from "./mappers/TaskMapper";
import { inject, injectable } from "inversify";

@injectable()
export class TasksService implements ITasksService {

    constructor(@inject('ITasksRepository') private readonly _tasksRepository: ITasksRepository) { }
    
    public async getTaskByIdAsync(id: number): Promise<Task> {

        const repoTask = await this._tasksRepository.getTaskByIdAsync(id);

        if (repoTask == null)
            throw new CustomError('Not found', `Task not found by id: ${id}`, 404, null);

        const bllTask = TaskMapper.toBLL(repoTask);

        return bllTask;
    }

    public async getTaskByTitleAsync(title: string): Promise<Task> {

        const repoTask = await this._tasksRepository.getTaskByTitleAsync(title);

        if (repoTask == null)
            throw new CustomError('Not found', `Task not found by title: ${title}`, 404, null);

        const bllTask = TaskMapper.toBLL(repoTask);

        return bllTask;
    }

    public async createTaskAsync(task: CreateTaskRequest): Promise<number> {

        const createTaskRepo = new CreateTaskDTO(task.title, task.description, task.taskComplexityId, task.isVisible);

        return await this._tasksRepository.createTaskAsync(createTaskRepo);
    }

    public async updateTaskAsync(task: UpdateTaskRequest): Promise<Task> {

        const updateTaskRepo = new UpdateTaskDTO(task.id, task.title, task.description, task.taskComplexityId, task.isVisible);

        const updatedTaskRepo = await this._tasksRepository.updateTaskAsync(updateTaskRepo);

        return TaskMapper.toBLL(updatedTaskRepo);
    }

    public async deleteTaskAsync(task: DeleteTaskRequest): Promise<number> {

        const deleteTaskRepo = new DeleteTaskDTO(task.id);

        await this._tasksRepository.deleteTaskAsync(deleteTaskRepo);

        return task.id;
    }

    public async changeTaskVisibilityAsync(task: ChangeTaskVisibilityRequest): Promise<number> {

        const changeTaskVisibilityRepo = new ChangeTaskVisibilityDTO(task.id, task.isVisible);

        await this._tasksRepository.changeTaskVisibilityAsync(changeTaskVisibilityRepo);

        return task.id;
    }

}
