import { User } from "./User"

export class Task {

    id: number

    title: string

    description: string

    createdAt: Date

    isVisible: boolean

    solvedBy: User[]

    constructor(id: number, title: string, description: string, createdAt: Date, isVisible: boolean, solvedBy: User[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.isVisible = isVisible;
        this.solvedBy = solvedBy;
    }
}