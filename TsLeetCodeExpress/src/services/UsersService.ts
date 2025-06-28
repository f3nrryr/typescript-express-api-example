import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { IUsersService } from "./interfaces/IUsersService";
import { User } from "./dto/response/User";
import { UserMapper } from "./mappers/UserMapper";
import { CustomError } from "../repoAndBLL/CustomError";
import { CreateUserRequest } from "./dto/request/user/CreateUserRequest";
import { CreateUserDTO } from "../repositories/dto/in/user/CreateUserDTO";
import { DeleteUserRequest } from "./dto/request/user/DeleteUserRequest";
import { UpdateUserRequest } from "./dto/request/user/UpdateUserRequest";
import { UpdateUserDTO } from "../repositories/dto/in/user/UpdateUserDTO";
import { DeleteUserDTO } from "../repositories/dto/in/user/DeleteUserDTO";
import { ChangeIsActiveUserRequest } from "./dto/request/user/ChangeIsActiveUserRequest";
import { ChangeIsActiveUserDTO } from "../repositories/dto/in/user/ChangeIsActiveUserDTO";
import { inject, injectable } from "inversify";
import { UsersRepository } from "../repositories/UsersRepository";

@injectable()
export class UsersService implements IUsersService {

    constructor(@inject('IUsersRepository') private readonly _usersRepository: IUsersRepository) { }

    public async getUserByIdAsync(id: number) : Promise<User> {

        const repoUser = await this._usersRepository.getUserByIdAsync(id);

        if (repoUser == null)
            throw new CustomError('Not found', `User not found by id: ${id}`, 404, null);

        const bllUser = UserMapper.toBLL(repoUser);

        return bllUser;
    }

    public async getUserByLoginAsync(login: string): Promise<User> {

        const repoUser = await this._usersRepository.getUserByLoginAsync(login);

        if (repoUser == null)
            throw new CustomError('Not found', `User not found by login: ${login}`, 404, null);

        const bllUser = UserMapper.toBLL(repoUser);

        return bllUser;
    }

    public async getUserByEmailAsync(email: string): Promise<User> {

        const repoUser = await this._usersRepository.getUserByEmailAsync(email);

        if (repoUser == null)
            throw new CustomError('Not found', `User not found by email: ${email}`, 404, null);

        const bllUser = UserMapper.toBLL(repoUser);

        return bllUser;
    }

    public async createUserAsync(user: CreateUserRequest): Promise<number> {

        const createUserRepo = new CreateUserDTO(user.login, user.email, user.passwordHash);

        return await this._usersRepository.createUserAsync(createUserRepo);
    }

    public async updateUserAsync(user: UpdateUserRequest): Promise<User> {

        const updateUserRepo = new UpdateUserDTO(user.id, user.newEmail, user.newPasswordHash);

        const updatedUserRepo = await this._usersRepository.updateUserAsync(updateUserRepo);

        return UserMapper.toBLL(updatedUserRepo);
    }

    public async deleteUserAsync(user: DeleteUserRequest): Promise<number> {

        const deleteUserRepo = new DeleteUserDTO(user.id);

        await this._usersRepository.deleteUserAsync(deleteUserRepo);

        return user.id;
    }

    public async changeIsActiveUserAsync(changeIsActiveUserRequest: ChangeIsActiveUserRequest): Promise<number> {

        const changeIsActiveUserRepo = new ChangeIsActiveUserDTO(changeIsActiveUserRequest.id, changeIsActiveUserRequest.isActive);

        await this._usersRepository.changeIsActiveUserAsync(changeIsActiveUserRepo);

        return changeIsActiveUserRequest.id;
    }
}