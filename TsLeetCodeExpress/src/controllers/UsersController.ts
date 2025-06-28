import { Request, Response, NextFunction } from 'express';
import { IUsersService } from "../services/interfaces/IUsersService";
import { User } from "./contractsDTOs/User";
import { UserMapper } from "./mappers/UserMapper";

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

        const bllUser = UserMapper.toBLL(req.body);

        const createdUserId = await this._usersService.createUserAsync(bllUser);

        return res.json(createdUserId);
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {

        const bllUser = UserMapper.toBLL(req.body);

        await this._usersService.updateUserAsync(bllUser);

        return res.json(req.body);
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {

        const bllUser = UserMapper.toBLL(req.body);

        await this._usersService.deleteUserAsync(bllUser);

        return res.json(req.body);
    }
}