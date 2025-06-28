import { Request, Response, NextFunction } from 'express';
import { IUsersService } from "../services/interfaces/IUsersService";
import { UserMapper } from "./mappers/UserMapper";

import { CreateUserRequest as ApiCreateRequest } from '../services/dto/request/user/CreateUserRequest';
import { CreateUserRequest as BllCreateRequest } from "../services/dto/request/user/CreateUserRequest";
import { UpdateUserRequest as ApiUpdateRequest } from './contractsDTOs/req/user/UpdateUserRequest';
import { UpdateUserRequest as BllUpdateRequest } from "../services/dto/request/user/UpdateUserRequest";
import { DeleteUserRequest as ApiDeleteRequest } from './contractsDTOs/req/user/DeleteUserRequest';
import { DeleteUserRequest as BllDeleteRequest } from "../services/dto/request/user/DeleteUserRequest";
import { ChangeIsActiveUserRequest as ApiChangeIsActiveUserRequest } from './contractsDTOs/req/user/ChangeIsActiveUserRequest';
import { ChangeIsActiveUserRequest as BllChangeIsActiveUserRequest } from "../services/dto/request/user/ChangeIsActiveUserRequest";

export class UsersController {

    constructor(private _usersService: IUsersService) { }

    async getUserById(req: Request, res: Response, next: NextFunction) {

        const bllUser = await this._usersService.getUserByIdAsync(Number(req.params.id));

        const apiContractUser = UserMapper.toApi(bllUser);

        return res.json(apiContractUser);
    }

    async getUserByLogin(req: Request, res: Response, next: NextFunction) {

        const bllUser = await this._usersService.getUserByLoginAsync(req.params.login);

        const apiContractUser = UserMapper.toApi(bllUser);

        return res.json(apiContractUser);
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {

        const bllUser = await this._usersService.getUserByEmailAsync(req.params.email);

        const apiContractUser = UserMapper.toApi(bllUser);

        return res.json(apiContractUser);
    }

    async createUser(req: Request, res: Response, next: NextFunction) {

        const createUserApiReq: ApiCreateRequest = req.body;

        const bllCreateUserReq = new BllCreateRequest(createUserApiReq.login, createUserApiReq.email, createUserApiReq.passwordHash);

        const createdUserId = await this._usersService.createUserAsync(bllCreateUserReq);

        return res.json(createdUserId);
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {

        const updateUserApiReq: ApiUpdateRequest = req.body;

        const bllUpdateUserReq = new BllUpdateRequest(updateUserApiReq.id, updateUserApiReq.newEmail, updateUserApiReq.newPasswordHash);

        const updatedUserBll = await this._usersService.updateUserAsync(bllUpdateUserReq);

        return res.json(UserMapper.toApi(updatedUserBll));
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {

        const apiDeleteReq: ApiDeleteRequest = req.body;

        const bllDeleteReq = new BllDeleteRequest(apiDeleteReq.id);

        await this._usersService.deleteUserAsync(bllDeleteReq);

        return res.json(apiDeleteReq.id);
    }

    async changeIsActiveUser(req: Request, res: Response, next: NextFunction) {

        const apiReq: ApiChangeIsActiveUserRequest = req.body;

        const bllReq = new BllChangeIsActiveUserRequest(apiReq.id, apiReq.isActive);

        await this._usersService.changeIsActiveUserAsync(bllReq);

        return res.json(apiReq.id);
    }
}