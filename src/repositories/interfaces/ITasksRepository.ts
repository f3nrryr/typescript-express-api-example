import { ChangeTaskVisibilityDTO } from "../dto/in/task/ChangeTaskVisibilityDTO";
import { CreateTaskDTO } from "../dto/in/task/CreateTaskDTO";
import { DeleteTaskDTO } from "../dto/in/task/DeleteTaskDTO";
import { UpdateTaskDTO } from "../dto/in/task/UpdateTaskDTO";
import { Task } from "../dto/out/Task";


export interface ITasksRepository {

    getTaskByIdAsync(id: number): Promise<Task | null>;

    getTaskByTitleAsync(title: string): Promise<Task | null>;

    createTaskAsync(task: CreateTaskDTO): Promise<number>;
    updateTaskAsync(task: UpdateTaskDTO): Promise<Task>;
    deleteTaskAsync(task: DeleteTaskDTO): Promise<number>;
    changeTaskVisibilityAsync(task: ChangeTaskVisibilityDTO): Promise<number>;
}