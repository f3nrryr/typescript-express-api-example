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
            const bllUser = UserMapper_1.UserMapper.toBLL(req.body);
            const createdUserId = yield this._usersService.createUserAsync(bllUser);
            return res.json(createdUserId);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = UserMapper_1.UserMapper.toBLL(req.body);
            yield this._usersService.updateUserAsync(bllUser);
            return res.json(req.body);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = UserMapper_1.UserMapper.toBLL(req.body);
            yield this._usersService.deleteUserAsync(bllUser);
            return res.json(req.body);
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map