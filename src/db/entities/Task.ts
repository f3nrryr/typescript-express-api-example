import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ForeignKey } from "typeorm";
import { User } from "./User"
import { TaskComplexity } from "./TaskComplexity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 50
    })
    title!: string

    @Column("text")
    description!: string

    @Column()
    @ForeignKey(() => TaskComplexity, "id")
    taskComplexityId!: number;

    @Column("timestamp without time zone")
    createdAt!: Date

    @Column()
    isVisible!: boolean

    @ManyToMany(() => User, (user) => user.solvedTasks)
    solvedBy!: User[]
}