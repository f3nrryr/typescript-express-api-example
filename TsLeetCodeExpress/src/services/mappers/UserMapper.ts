import { User as ServiceUser } from "../dto/response/User";
import { User as RepoUser } from "../../repositories/dto/out/User";
import { TaskMapper } from "./TaskMapper";

export class UserMapper {

    public static toBLL(user: RepoUser): ServiceUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toBLL);

        return new ServiceUser(user.id, user.login, user.email, user.isActive, user.createdAt, userSolvedTasks);
    }

    public static toRepo(user: ServiceUser): RepoUser {

        const userSolvedTasks = user.solvedTasks.map(TaskMapper.toRepo);

        return new RepoUser(user.id, user.login, user.email, "", user.isActive, user.createdAt, userSolvedTasks);
    }

}