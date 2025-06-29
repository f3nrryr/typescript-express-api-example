import { TaskMapper } from "./TaskMapper";
import { User as BllUser } from "../../services/dto/response/User";
import { User as ApiUser } from "../contractsDTOs/res/User";

export class UserMapper {

    public static toApi(user: BllUser): ApiUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toApi);

        return new ApiUser(user.id, user.login, user.email, user.isActive, user.createdAt, userSolvedTasks);
    }
}