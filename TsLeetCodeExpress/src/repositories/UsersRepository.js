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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UsersRepository__repository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const index_1 = require("../db/index");
const User_1 = require("../db/User");
const UserMapper_1 = require("./mappers/UserMapper");
class UsersRepository {
    constructor() {
        _UsersRepository__repository.set(this, index_1.AppDataSource.getRepository(User_1.User));
    }
    getUserByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").findOneBy({
                id: id
            });
            if (dbUser == null)
                return null;
            const repoUser = UserMapper_1.UserMapper.toRepoLayer(dbUser);
            return repoUser;
        });
    }
    getUserByLoginAsync(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").findOneBy({
                login: login
            });
            if (dbUser == null)
                return null;
            const repoUser = UserMapper_1.UserMapper.toRepoLayer(dbUser);
            return repoUser;
        });
    }
    getUserByEmailAsync(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").findOneBy({
                email: email
            });
            if (dbUser == null)
                return null;
            const repoUser = UserMapper_1.UserMapper.toRepoLayer(dbUser);
            return repoUser;
        });
    }
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = __classPrivateFieldGet(this, _UsersRepository__repository, "f").create({
                login: user.login,
                email: user.email,
                createdAt: new Date(),
                isActive: true,
                passwordHash: user.passwordHash
            });
            __classPrivateFieldGet(this, _UsersRepository__repository, "f").save(newUser);
            return newUser.id; // todo: ���������, ������� �� id.
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").save(user);
            return user;
        });
    }
    deleteUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").delete(user);
            return user;
        });
    }
}
exports.UsersRepository = UsersRepository;
_UsersRepository__repository = new WeakMap();
//# sourceMappingURL=UsersRepository.js.map