import { ChangeIsActiveUserDTO } from "../dto/in/user/ChangeIsActiveUserDTO";
import { CreateUserDTO } from "../dto/in/user/CreateUserDTO";
import { DeleteUserDTO } from "../dto/in/user/DeleteUserDTO";
import { UpdateUserDTO } from "../dto/in/user/UpdateUserDTO";
import { User } from "../dto/out/User";

export interface IUsersRepository {

    getUserByIdAsync(id: number): Promise<User | null>;

    getUserByLoginAsync(login: string): Promise<User | null>;

    getUserByEmailAsync(email: string): Promise<User | null>;
    createUserAsync(user: CreateUserDTO): Promise<number>;
    updateUserAsync(user: UpdateUserDTO): Promise<User>;
    deleteUserAsync(user: DeleteUserDTO): Promise<number>;
    changeIsActiveUserAsync(changeIsActiveUserDTO: ChangeIsActiveUserDTO): Promise<number>;
}