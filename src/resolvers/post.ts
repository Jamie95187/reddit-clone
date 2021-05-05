const { Resolver, Mutation, Query, Ctx, Arg, Int } = require("type-graphql");
import { Post } from "../entity/Post";
import { MyContext } from '../types';

@Resolver()
export class PostResolver {

  // Queries are used for getting data

  @Query(() => [Post])
  posts(@Ctx() { cm }: MyContext): Promise<Post[]> {
    return cm.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number,
       @Ctx() { cm }: MyContext): Promise<Post | null> {
    return cm.findOne(Post, {id});
  }

  // Mutations are for updating, inserting and deleting

  @Mutation(() => Post)
  async createPost(@Arg("title", () => String) title: string,
       @Ctx() { cm }: MyContext): Promise<Post> {
         const post = new Post();
         post.title = "First Post";
         await connection.manager.save(post);
         return post;
  }

  @Mutation(() => Post, {nullable: true})
  async updatePost(
    @Arg("id") id: string,
    @Arg("title", () => String, { nullable: true }) title: string,
       @Ctx() { cm }: MyContext): Promise<Post | null> {
         const post = await em.findOne(Post, {id});
         if (!post) {
           return null
         }
         if (typeof title !== 'undefined') {
           post.title;
         }
         post.title = "First Post";
         await connection.manager.save(post);
         return post;
  }
}
