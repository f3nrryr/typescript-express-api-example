import { Task as BllTask } from "../../services/dto/response/Task";
import { Task as ApiTask } from "../contractsDTOs/res/Task";
import { UserMapper } from "./UserMapper";

export class TaskMapper {

    public static toApi(task: BllTask): ApiTask {

        const solvedByMapped = task.solvedBy.map(UserMapper.toApi);

        return new ApiTask(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }

    public static toBLL(task: ApiTask): BllTask {

        const solvedByMapped = task.solvedBy.map(UserMapper.toBLL);

        return new BllTask(task.id, task.title, task.description, task.createdAt, task.isVisible, solvedByMapped);
    }

}