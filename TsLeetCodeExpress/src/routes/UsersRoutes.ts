import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

class UsersRoutes {

    router = Router();

    constructor(private _usersController: UsersController) {
        this.#_initRoutes();
    }

    #_initRoutes() {

        this.router.get('/:id', async (req, res, next) => {
            await this._usersController.getUserById(req, res, next);
        });

        this.router.get('/:email', async (req, res, next) => {
            await this._usersController.getUserByEmail(req, res, next);
        });

        this.router.get('/:login', async (req, res, next) => {
            await this._usersController.getUserByLogin(req, res, next);
        });

        this.router.post('/create', async (req, res, next) => {
            await this._usersController.createUser(req, res, next);
        });

        this.router.post('/isActive', async (req, res, next) => {
            await this._usersController.changeIsActiveUser(req, res, next);
        });

        this.router.put('/', async (req, res, next) => {
            await this._usersController.updateUser(req, res, next);
        });

        this.router.delete('/', async (req, res, next) => {
            await this._usersController.deleteUser(req, res, next);
        });

    }
}

// Фабричная функция для создания роутера:
export const createUsersRouter = (usersController: UsersController) => {
    return new UsersRoutes(usersController).router;
};