import { Task as RepoTask } from "../../repositories/dto/out/Task";
import { Task as ServiceTask } from "../dto/response/Task";
import { UserMapper } from "./UserMapper";

export class TaskMapper {

    public static toBLL(task: RepoTask): ServiceTask {

        const solvedByMapped = task.solvedBy.map(UserMapper.toBLL);

        return new ServiceTask(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }

    public static toRepo(task: ServiceTask): RepoTask {

        const solvedByMapped = task.solvedBy.map(UserMapper.toRepo);

        return new ServiceTask(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }

}