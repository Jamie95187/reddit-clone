import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
