import { TaskMapper } from "./TaskMapper";
import { User as BllUser } from "../../services/dto/User";
import { User as ApiUser } from "../contractsDTOs/User";

export class UserMapper {

    public static toApi(user: BllUser): ApiUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toApi);

        return new ApiUser(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }

    public static toBLL(user: ApiUser): BllUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toBLL);

        return new BllUser(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }

}