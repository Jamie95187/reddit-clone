import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { ObjectType, Field } from "type-graphql";

// Declare object tyep when using with graphql
// @ObjectType()
@Entity()
export class Post {

    // @Field()
    @PrimaryGeneratedColumn()
    id: number;

    // @Field(() => String)
    @CreateDateColumn()
    create_at: Date;

    // @Field(() => String)
    @UpdateDateColumn()
    update_at: Date;

    // @Field()
    @Column()
    title: string;

}
