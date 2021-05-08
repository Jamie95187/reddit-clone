import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
const { ObjectType, Field } = require("type-graphql");

// Declare object type when using with graphql
@ObjectType()
@Entity()
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
    @Property({ type: "text", unique: true })
    username!: string;

    @Field()
    @Column()
    title: string;

}
