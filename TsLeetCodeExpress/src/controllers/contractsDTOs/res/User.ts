import { Task } from "./Task";

export class User {

    id: number;
    login: string;
    email: string;
    createdAt: Date;
    isActive: boolean;
    solvedTasks: Task[];

    constructor(
        id: number,
        login: string,
        email: string,
        isActive: boolean,
        createdAt: Date,
        solvedTasks: Task[]
    ) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.solvedTasks = solvedTasks;
    }
}