import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Task } from "./Task"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50
    })
    login!: string;

    @Column({
        length: 50
    })
    email!: string;

    @Column("text")
    passwordHash!: string;

    @Column("timestamp without time zone")
    createdAt!: Date;

    @Column()
    isActive!: boolean;

    @ManyToMany(() => Task, (task) => task.solvedBy)
    solvedTasks!: Task[];
}