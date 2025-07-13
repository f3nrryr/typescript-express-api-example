import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { register, getRoutes } from "express-decorators";

class UsersRoutes {
    router = Router();

    constructor(private _usersController: UsersController) {
        this._initRoutes();
    }

    private _initRoutes() {
        // Register decorated routes from the controller
        //const routes = getRoutes(this._usersController);
        //routes.forEach((r) => {
        //    console.log(`${r.method} ${r.path}`);
        //})
        //console.log(`routes: ${routes.length}`);

        try {
            register(this.router, this._usersController);
        }
        catch (e) {
            console.error(e);
        }
    }
}

// Фабричная функция для создания роутера:
export const registerUsersRoutes = (usersController: UsersController) => {
    const userRoutes = new UsersRoutes(usersController).router;
    return userRoutes;
};