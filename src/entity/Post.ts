const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } = require ("typeorm");
const { ObjectType, Field } = require("type-graphql");

// Declare object type when using with graphql
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
