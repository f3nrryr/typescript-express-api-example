"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const UserMapper_1 = require("./mappers/UserMapper");
const CreateUserRequest_1 = require("../services/dto/request/user/CreateUserRequest");
const UpdateUserRequest_1 = require("../services/dto/request/user/UpdateUserRequest");
const DeleteUserRequest_1 = require("../services/dto/request/user/DeleteUserRequest");
const ChangeIsActiveUserRequest_1 = require("../services/dto/request/user/ChangeIsActiveUserRequest");
class UsersController {
    constructor(_usersService) {
        this._usersService = _usersService;
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByIdAsync(Number(req.params.id));
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            return res.json(apiContractUser);
        });
    }
    getUserByLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByLoginAsync(req.params.login);
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            return res.json(apiContractUser);
        });
    }
    getUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByEmailAsync(req.params.email);
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            return res.json(apiContractUser);
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserApiReq = req.body;
            const bllCreateUserReq = new CreateUserRequest_1.CreateUserRequest(createUserApiReq.login, createUserApiReq.email, createUserApiReq.passwordHash);
            const createdUserId = yield this._usersService.createUserAsync(bllCreateUserReq);
            return res.json(createdUserId);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserApiReq = req.body;
            const bllUpdateUserReq = new UpdateUserRequest_1.UpdateUserRequest(updateUserApiReq.id, updateUserApiReq.newEmail, updateUserApiReq.newPasswordHash);
            const updatedUserBll = yield this._usersService.updateUserAsync(bllUpdateUserReq);
            return res.json(UserMapper_1.UserMapper.toApi(updatedUserBll));
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiDeleteReq = req.body;
            const bllDeleteReq = new DeleteUserRequest_1.DeleteUserRequest(apiDeleteReq.id);
            yield this._usersService.deleteUserAsync(bllDeleteReq);
            return res.json(apiDeleteReq.id);
        });
    }
    changeIsActiveUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new ChangeIsActiveUserRequest_1.ChangeIsActiveUserRequest(apiReq.id, apiReq.isActive);
            yield this._usersService.changeIsActiveUserAsync(bllReq);
            return res.json(apiReq.id);
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map