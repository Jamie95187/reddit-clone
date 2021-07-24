const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } = require("typeorm");
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: Number;

    @Field(() => String)
    @CreateDateColumn()
    create_at: Date;

    @Field(() => String)
    @UpdateDateColumn()
    update_at: Date;

    @Field()
    @Column()
    title: string;

}
