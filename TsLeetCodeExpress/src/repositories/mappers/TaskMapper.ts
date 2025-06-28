import { Task as RepoTask } from "../dto/out/Task";
import { Task as DbTask } from "..//../db/Task";
import { UserMapper } from "./UserMapper";

export class TaskMapper {

    public static toRepoLayer(task: DbTask) : RepoTask {

        const solvedByMapped = task.solvedBy.map(UserMapper.toRepoLayer);

        return new RepoTask(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }
}