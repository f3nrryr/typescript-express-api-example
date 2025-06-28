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
exports.UsersService = void 0;
const UserMapper_1 = require("./mappers/UserMapper");
const CustomError_1 = require("../repoAndBLL/CustomError");
class UsersService {
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
            const repoUser = UserMapper_1.UserMapper.toRepo(user);
            return yield this._usersRepository.createUserAsync(repoUser);
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoUser = UserMapper_1.UserMapper.toRepo(user);
            yield this._usersRepository.updateUserAsync(repoUser);
            return user;
        });
    }
    deleteUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoUser = UserMapper_1.UserMapper.toRepo(user);
            yield this._usersRepository.deleteUserAsync(repoUser);
            return user;
        });
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.js.map