import { Task } from "./Task";

export class User {

    id: number | null;
    login: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    isActive: boolean;
    solvedTasks: Task[];

    constructor(
        id: number | null,
        login: string,
        email: string,
        passwordHash: string,
        isActive: boolean,
        createdAt: Date,
        solvedTasks: Task[] = []
    ) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.solvedTasks = solvedTasks;
    }
}