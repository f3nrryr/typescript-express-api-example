import { AppDataSource } from "../db/index";
import { Task as DbTask } from "../db/Task";
import { TaskMapper } from "./mappers/TaskMapper";
import { CustomError } from "../repoAndBLL/CustomError";
import { ITasksRepository } from "./interfaces/ITasksRepository";
import { Task as RepoTask } from "../repositories/dto/out/Task";
import { CreateTaskDTO } from "./dto/in/task/CreateTaskDTO";
import { UpdateTaskDTO } from "./dto/in/task/UpdateTaskDTO";
import { DeleteTaskDTO } from "./dto/in/task/DeleteTaskDTO";
import { ChangeTaskVisibilityDTO } from "./dto/in/task/ChangeTaskVisibilityDTO";

export class TasksRepository implements ITasksRepository {
   
    #_repository = AppDataSource.getRepository(DbTask);

    public async getTaskByIdAsync(id: number): Promise<RepoTask | null> {

        const dbTask = await this.#_repository.findOneBy(
            {
                id: id
            }
        );

        if (dbTask == null)
            return null;

        const repoTask = TaskMapper.toRepoLayer(dbTask);

        return repoTask;
    }

    public async getTaskByTitleAsync(title: string): Promise<RepoTask | null> {

        const dbTask = await this.#_repository.findOneBy(
            {
                title: title
            }
        );

        if (dbTask == null)
            return null;

        const repoTask = TaskMapper.toRepoLayer(dbTask);

        return repoTask;
    }

    public async createTaskAsync(createTaskDTO: CreateTaskDTO): Promise<number> {

        const newTask = this.#_repository.create({
            title: createTaskDTO.title,
            description: createTaskDTO.description,
            taskComplexityId: createTaskDTO.taskComplexityId,
            isVisible: createTaskDTO.isVisible,
            createdAt: new Date()
        });

        this.#_repository.save(newTask);

        return newTask.id;
    }

    public async updateTaskAsync(updateTaskDTO: UpdateTaskDTO): Promise<RepoTask> {

        const taskDb = await this.#_repository.findOneBy({
            id: updateTaskDTO.id
        });

        if (taskDb == null) throw new CustomError("Not found", `Task not found in db by id: ${updateTaskDTO.id}`, 404, null);

        taskDb.title = updateTaskDTO.title;
        taskDb.description = updateTaskDTO.description;
        taskDb.taskComplexityId = updateTaskDTO.taskComplexityId;
        taskDb.isVisible = updateTaskDTO.isVisible;

        const savedTaskDb = await this.#_repository.save(taskDb);

        return TaskMapper.toRepoLayer(savedTaskDb);

    }

    public async deleteTaskAsync(deleteTaskDTO: DeleteTaskDTO): Promise<number> {

        await this.#_repository.delete({ id: deleteTaskDTO.id});

        return deleteTaskDTO.id;
    }

    public async changeTaskVisibilityAsync(changeTaskVisibilityDTO: ChangeTaskVisibilityDTO): Promise<number> {
        const taskDb = await this.#_repository.findOneBy({
            id: changeTaskVisibilityDTO.id
        });

        if (taskDb == null) throw new CustomError("Not found", `Task not found in db by id: ${changeTaskVisibilityDTO.id}`, 404, null);

        taskDb.isVisible = changeTaskVisibilityDTO.isVisible;

        const savedTaskDb = await this.#_repository.save(taskDb);

        return savedTaskDb.id;
    }

}