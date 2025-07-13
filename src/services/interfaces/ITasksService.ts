import { ChangeTaskVisibilityRequest } from "../dto/request/task/ChangeTaskVisibilityRequest";
import { CreateTaskRequest } from "../dto/request/task/CreateTaskRequest";
import { DeleteTaskRequest } from "../dto/request/task/DeleteTaskRequest";
import { UpdateTaskRequest } from "../dto/request/task/UpdateTaskRequest";
import { Task } from "../dto/response/Task";

export interface ITasksService {
    getTaskByIdAsync(id: number): Promise<Task>;

    getTaskByTitleAsync(title: string): Promise<Task>;

    createTaskAsync(task: CreateTaskRequest): Promise<number>;

    updateTaskAsync(task: UpdateTaskRequest): Promise<Task>;

    deleteTaskAsync(task: DeleteTaskRequest): Promise<number>;

    changeTaskVisibilityAsync(task: ChangeTaskVisibilityRequest): Promise<number>;
}