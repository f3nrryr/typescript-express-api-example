import { ChangeIsActiveUserRequest } from "../dto/request/user/ChangeIsActiveUserRequest";
import { CreateUserRequest } from "../dto/request/user/CreateUserRequest";
import { DeleteUserRequest } from "../dto/request/user/DeleteUserRequest";
import { UpdateUserRequest } from "../dto/request/user/UpdateUserRequest";
import { User } from "../dto/response/User";

export interface IUsersService {
    getUserByIdAsync(id: number): Promise<User>;

    getUserByLoginAsync(login: string): Promise<User>;

    getUserByEmailAsync(email: string): Promise<User>;

    createUserAsync(user: CreateUserRequest): Promise<number>;

    updateUserAsync(user: UpdateUserRequest): Promise<User>;
    deleteUserAsync(user: DeleteUserRequest): Promise<number>;
    changeIsActiveUserAsync(changeIsActiveUserRequest: ChangeIsActiveUserRequest): Promise<number>;
}