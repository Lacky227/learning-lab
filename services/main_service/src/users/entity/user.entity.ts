import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique:true, nullable:false})
    username: string;

    @Column({ type: 'varchar', length: 255, unique:true, nullable:false})
    email: string;

    @Column({ type: 'varchar', length: 255, nullable:false})
    password: string;

    @Column({ type: 'int', nullable:false})
    age: number;
}