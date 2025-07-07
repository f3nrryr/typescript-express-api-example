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
const express_decorators_1 = require("express-decorators");
const logDecorator_1 = require("../logger/logDecorator");
let UsersController = class UsersController {
    constructor(_usersService, _logger) {
        this._usersService = _usersService;
        this._logger = _logger;
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByIdAsync(Number(req.params.id));
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            res.json(apiContractUser);
        });
    }
    getUserByLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByLoginAsync(req.params.login);
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            res.json(apiContractUser);
        });
    }
    getUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bllUser = yield this._usersService.getUserByEmailAsync(req.params.email);
            const apiContractUser = UserMapper_1.UserMapper.toApi(bllUser);
            res.json(apiContractUser);
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserApiReq = req.body;
            const bllCreateUserReq = new CreateUserRequest_1.CreateUserRequest(createUserApiReq.login, createUserApiReq.email, createUserApiReq.passwordHash);
            const createdUserId = yield this._usersService.createUserAsync(bllCreateUserReq);
            res.json(createdUserId);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserApiReq = req.body;
            const bllUpdateUserReq = new UpdateUserRequest_1.UpdateUserRequest(updateUserApiReq.id, updateUserApiReq.newEmail, updateUserApiReq.newPasswordHash);
            const updatedUserBll = yield this._usersService.updateUserAsync(bllUpdateUserReq);
            res.json(UserMapper_1.UserMapper.toApi(updatedUserBll));
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiDeleteReq = req.body;
            const bllDeleteReq = new DeleteUserRequest_1.DeleteUserRequest(apiDeleteReq.id);
            yield this._usersService.deleteUserAsync(bllDeleteReq);
            res.json(apiDeleteReq.id);
        });
    }
    changeIsActiveUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiReq = req.body;
            const bllReq = new ChangeIsActiveUserRequest_1.ChangeIsActiveUserRequest(apiReq.id, apiReq.isActive);
            yield this._usersService.changeIsActiveUserAsync(bllReq);
            res.json(apiReq.id);
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, express_decorators_1.get)('/id/:id'),
    (0, logDecorator_1.LogRequestResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, express_decorators_1.get)('/login/:login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByLogin", null);
__decorate([
    (0, express_decorators_1.get)('/email/:email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, express_decorators_1.post)('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, express_decorators_1.put)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, express_decorators_1.post)('/delete') // ADR: � ���� @del, @route('del', '/') ������ ������ ���������� undefined
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, express_decorators_1.patch)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeIsActiveUser", null);
exports.UsersController = UsersController = __decorate([
    (0, express_decorators_1.basePath)('/users'),
    __metadata("design:paramtypes", [Object, Object])
], UsersController);
//# sourceMappingURL=UsersController.js.map