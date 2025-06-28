import { AppDataSource } from "../db/index";
import { User as DbUser } from "../db/User";
import { User as RepoUser } from "../repositories/dto/out/User"
import { IUsersRepository } from "./interfaces/IUsersRepository";
import { UserMapper } from "./mappers/UserMapper";
import { CustomError } from "../repoAndBLL/CustomError";
import { CreateUserDTO } from "./dto/in/user/CreateUserDTO";
import { UpdateUserDTO } from "./dto/in/user/UpdateUserDTO";
import { DeleteUserDTO } from "./dto/in/user/DeleteUserDTO";
import { ChangeIsActiveUserDTO } from "./dto/in/user/ChangeIsActiveUserDTO";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUsersRepository {

    #_repository = AppDataSource.getRepository(DbUser);

    public async getUserByIdAsync(id: number): Promise<RepoUser | null> {

        const dbUser = await this.#_repository.findOneBy(
            {
                id: id
            }
        );

        if (dbUser == null)
            return null;

        const repoUser = UserMapper.toRepoLayer(dbUser);

        return repoUser;
    }

    public async getUserByLoginAsync(login: string): Promise<RepoUser | null> {

        const dbUser = await this.#_repository.findOneBy(
            {
                login: login
            }
        );

        if (dbUser == null)
            return null;

        const repoUser = UserMapper.toRepoLayer(dbUser);

        return repoUser;
    }

    public async getUserByEmailAsync(email: string) : Promise<RepoUser | null> {

        const dbUser = await this.#_repository.findOneBy(
            {
                email: email
            }
        );

        if (dbUser == null)
            return null;

        const repoUser = UserMapper.toRepoLayer(dbUser);

        return repoUser;
    }

    public async createUserAsync(createUserDTO: CreateUserDTO) : Promise<number> {

        const newUser = this.#_repository.create({
            login: createUserDTO.login,
            email: createUserDTO.email,
            passwordHash: createUserDTO.passwordHash,
            isActive: true,
            createdAt: new Date()
        });

        this.#_repository.save(newUser);

        return newUser.id; // todo: проверить, выводит ли id.
    }

    public async updateUserAsync(updateUserDTO: UpdateUserDTO): Promise<RepoUser> {

        const userDb = await this.#_repository.findOneBy({
            id: updateUserDTO.id
        });

        if (userDb == null) throw new CustomError("Not found", `User not found in db by id: ${updateUserDTO.id}`, 404, null);

        userDb.email = updateUserDTO.newEmail;
        userDb.passwordHash = updateUserDTO.newPasswordHash;

        const savedUserDB = await this.#_repository.save(userDb);

        return UserMapper.toRepoLayer(savedUserDB);
    }

    public async deleteUserAsync(deleteUserDTO: DeleteUserDTO): Promise<number> {

        await this.#_repository.delete({ id: deleteUserDTO.id});

        return deleteUserDTO.id;
    }

    public async changeIsActiveUserAsync(changeIsActiveUserDTO: ChangeIsActiveUserDTO): Promise<number> {
        const userDb = await this.#_repository.findOneBy({
            id: changeIsActiveUserDTO.id
        });

        if (userDb == null) throw new CustomError("Not found", `User not found in db by id: ${changeIsActiveUserDTO.id}`, 404, null);

        userDb.isActive = changeIsActiveUserDTO.isActive;

        const savedUserDB = await this.#_repository.save(userDb);

        return savedUserDB.id;
    }
}