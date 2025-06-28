import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TaskComplexity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 50
    })
    title!: string

    @Column("timestamp without time zone")
    createdAt!: Date
}