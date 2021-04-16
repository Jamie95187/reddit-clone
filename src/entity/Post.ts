import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: new Date();

    @Column()
    updatedAt: new Date();

    @Column()
    title!: string;

}
