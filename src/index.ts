import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
// import { PostResolver } from "./resolvers/post";
// import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';

import cors from 'cors';
import { COOKIE_NAME } from './constants';

// Unlike mikroOrm, the createConnection function automatically finds the ormconfig.json file as long as it is
// near the package.json (root directory)

createConnection().then(async connection => {

    const app = express();

    // Use Docker container with redis
    // Connect to redis using docker in cmd "docker run -d -p 6379:6379 --name redis1 redis"
    // User 'docker container start redis1'
    // 'docker exec -it redis1 sh'
    // '# redis-cli'

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    // Session middleware needs to be added before the apollo middleware because we will use
    // session inside apolloserver

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [PostResolver],
        // resolvers: [PostResolver, UserResolver],
        emitSchemaFile: true,
        validate: false
      }),
      context: ({ req, res }) => ({ req, res })
    });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

    app.listen(8080, () => {
      console.log('server started on localhost:8080')
    })

}).catch(error => console.log(error));

import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";

import { ApolloServer } from "apollo-server-express";

@Resolver()
export class PostResolver {

  // Queries are used for getting data

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return getConnection().manager.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | null> {
    return getConnection().manager.findOneOrFail(Post, {id});
  }

  // Mutations are for updating, inserting and deleting

  @Mutation(() => Post)
  async createPost(@Arg("title", () => String) title: string)
  {
     const post = new Post();
     post.title = title;
     await getConnection().manager.save(post);
     return post;
  }

  @Mutation(() => String, {nullable: true})
  async updatePost(
    @Arg("id") id: string,
    @Arg("title", () => String, { nullable: true }) title: string) {
     await getConnection()
     .createQueryBuilder()
     .update(Post)
     .set({
       title: title
     })
     .where("id = :id", { id: id })
     .execute();
     return "Success";
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: string) {
     await getConnection()
     .createQueryBuilder()
     .delete()
     .from(Post)
     .where("id = :id", { id: id })
     .execute();
     return true;
  }
}

import { ObjectType, Field } from "type-graphql";
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
