"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const CustomError_1 = require("../repoAndBLL/CustomError");
const injectable_1 = require("@inversifyjs/core/lib/cjs/metadata/decorators/injectable");
let UsersRepository = class UsersRepository {
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
    createUserAsync(createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = __classPrivateFieldGet(this, _UsersRepository__repository, "f").create({
                login: createUserDTO.login,
                email: createUserDTO.email,
                passwordHash: createUserDTO.passwordHash,
                isActive: true,
                createdAt: new Date()
            });
            __classPrivateFieldGet(this, _UsersRepository__repository, "f").save(newUser);
            return newUser.id; // todo: ���������, ������� �� id.
        });
    }
    updateUserAsync(updateUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDb = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").findOneBy({
                id: updateUserDTO.id
            });
            if (userDb == null)
                throw new CustomError_1.CustomError("Not found", `User not found in db by id: ${updateUserDTO.id}`, 404, null);
            userDb.email = updateUserDTO.newEmail;
            userDb.passwordHash = updateUserDTO.newPasswordHash;
            const savedUserDB = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").save(userDb);
            return UserMapper_1.UserMapper.toRepoLayer(savedUserDB);
        });
    }
    deleteUserAsync(deleteUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").delete({ id: deleteUserDTO.id });
            return deleteUserDTO.id;
        });
    }
    changeIsActiveUserAsync(changeIsActiveUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDb = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").findOneBy({
                id: changeIsActiveUserDTO.id
            });
            if (userDb == null)
                throw new CustomError_1.CustomError("Not found", `User not found in db by id: ${changeIsActiveUserDTO.id}`, 404, null);
            userDb.isActive = changeIsActiveUserDTO.isActive;
            const savedUserDB = yield __classPrivateFieldGet(this, _UsersRepository__repository, "f").save(userDb);
            return savedUserDB.id;
        });
    }
};
exports.UsersRepository = UsersRepository;
_UsersRepository__repository = new WeakMap();
exports.UsersRepository = UsersRepository = __decorate([
    (0, injectable_1.injectable)()
], UsersRepository);
//# sourceMappingURL=UsersRepository.js.map