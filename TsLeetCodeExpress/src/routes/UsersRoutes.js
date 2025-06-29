"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsersRoutes = void 0;
const express_1 = require("express");
const express_decorators_1 = require("express-decorators");
class UsersRoutes {
    constructor(_usersController) {
        this._usersController = _usersController;
        this.router = (0, express_1.Router)();
        this._initRoutes();
    }
    _initRoutes() {
        // Register decorated routes from the controller
        const routes = (0, express_decorators_1.getRoutes)(this._usersController);
        routes.forEach((r) => {
            console.log(`${r.method} ${r.path}`);
        });
        console.log(`routes: ${routes.length}`);
        (0, express_decorators_1.register)(this.router, routes);
    }
}
// ��������� ������� ��� �������� �������:
const registerUsersRoutes = (usersController) => {
    const userRoutes = new UsersRoutes(usersController).router;
    return userRoutes;
};
exports.registerUsersRoutes = registerUsersRoutes;
//# sourceMappingURL=UsersRoutes.js.map