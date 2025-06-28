import { User as DbUser } from "../../db/User";
import { User as RepoUser } from "../../repositories/dto/out/User";
import { TaskMapper } from "./TaskMapper";

export class UserMapper {

    public static toRepoLayer(user: DbUser) : RepoUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toRepoLayer);

        return new RepoUser(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }

}