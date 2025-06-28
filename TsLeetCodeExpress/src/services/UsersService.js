"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UsersService = void 0;
const UserMapper_1 = require("./mappers/UserMapper");
const CustomError_1 = require("../repoAndBLL/CustomError");
const CreateUserDTO_1 = require("../repositories/dto/in/user/CreateUserDTO");
const UpdateUserDTO_1 = require("../repositories/dto/in/user/UpdateUserDTO");
const DeleteUserDTO_1 = require("../repositories/dto/in/user/DeleteUserDTO");
const ChangeIsActiveUserDTO_1 = require("../repositories/dto/in/user/ChangeIsActiveUserDTO");
const inversify_1 = require("inversify");
let UsersService = class UsersService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository;
    }
    getUserByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoUser = yield this._usersRepository.getUserByIdAsync(id);
            if (repoUser == null)
                throw new CustomError_1.CustomError('Not found', `User not found by id: ${id}`, 404, null);
            const bllUser = UserMapper_1.UserMapper.toBLL(repoUser);
            return bllUser;
        });
    }
    getUserByLoginAsync(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoUser = yield this._usersRepository.getUserByLoginAsync(login);
            if (repoUser == null)
                throw new CustomError_1.CustomError('Not found', `User not found by login: ${login}`, 404, null);
            const bllUser = UserMapper_1.UserMapper.toBLL(repoUser);
            return bllUser;
        });
    }
    getUserByEmailAsync(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoUser = yield this._usersRepository.getUserByEmailAsync(email);
            if (repoUser == null)
                throw new CustomError_1.CustomError('Not found', `User not found by email: ${email}`, 404, null);
            const bllUser = UserMapper_1.UserMapper.toBLL(repoUser);
            return bllUser;
        });
    }
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserRepo = new CreateUserDTO_1.CreateUserDTO(user.login, user.email, user.passwordHash);
            return yield this._usersRepository.createUserAsync(createUserRepo);
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserRepo = new UpdateUserDTO_1.UpdateUserDTO(user.id, user.newEmail, user.newPasswordHash);
            const updatedUserRepo = yield this._usersRepository.updateUserAsync(updateUserRepo);
            return UserMapper_1.UserMapper.toBLL(updatedUserRepo);
        });
    }
    deleteUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUserRepo = new DeleteUserDTO_1.DeleteUserDTO(user.id);
            yield this._usersRepository.deleteUserAsync(deleteUserRepo);
            return user.id;
        });
    }
    changeIsActiveUserAsync(changeIsActiveUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeIsActiveUserRepo = new ChangeIsActiveUserDTO_1.ChangeIsActiveUserDTO(changeIsActiveUserRequest.id, changeIsActiveUserRequest.isActive);
            yield this._usersRepository.changeIsActiveUserAsync(changeIsActiveUserRepo);
            return changeIsActiveUserRequest.id;
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUsersRepository')),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=UsersService.js.map