import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskPriority } from "./enums/task-priority.enum";
import { TaskCategory } from "./enums/task-category.enum";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable:false})
    taskId: string;

    @Column({ type: 'varchar', length: 255, nullable:false})
    title: string;

    @Column({ type: 'varchar', length: 255, nullable:false})
    description: string;

    @Column({ type: 'enum', enum: TaskPriority, nullable:false})
    priority: TaskPriority;

    @Column({ type: 'enum', enum: TaskCategory, nullable:false})
    category: TaskCategory;

    @Column({ type: 'boolean', nullable:false})
    isDone: boolean;

}
