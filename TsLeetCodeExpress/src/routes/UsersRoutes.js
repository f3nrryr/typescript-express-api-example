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
var _UsersRoutes_instances, _UsersRoutes__initRoutes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersRouter = void 0;
const express_1 = require("express");
class UsersRoutes {
    constructor(_usersController) {
        _UsersRoutes_instances.add(this);
        this._usersController = _usersController;
        this.router = (0, express_1.Router)();
        __classPrivateFieldGet(this, _UsersRoutes_instances, "m", _UsersRoutes__initRoutes).call(this);
    }
}
_UsersRoutes_instances = new WeakSet(), _UsersRoutes__initRoutes = function _UsersRoutes__initRoutes() {
    this.router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.getUserById(req, res, next);
    }));
    this.router.get('/:email', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.getUserByEmail(req, res, next);
    }));
    this.router.get(':/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.getUserByLogin(req, res, next);
    }));
    this.router.post('/create', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.createUser(req, res, next);
    }));
    this.router.post('/isActive', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.changeIsActiveUser(req, res, next);
    }));
    this.router.put('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.updateUser(req, res, next);
    }));
    this.router.delete('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield this._usersController.deleteUser(req, res, next);
    }));
};
// ��������� ������� ��� �������� �������:
const createUsersRouter = (usersController) => {
    return new UsersRoutes(usersController).router;
};
exports.createUsersRouter = createUsersRouter;
//# sourceMappingURL=UsersRoutes.js.map