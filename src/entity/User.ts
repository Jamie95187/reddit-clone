import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";
const { ObjectType, Field } = require("type-graphql");

// Declare object type when using with graphql
@ObjectType()
@Entity()
@Unique(["username"])
export class User {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: Number;

    @Field(() => String)
    @CreateDateColumn()
    create_at: Date;

    @Field(() => String)
    @UpdateDateColumn()
    update_at: Date;

    @Field()
    @Column({ name: 'user_name' })
    username!: string;

    @Field()
    @Column()
    title: string;

}
