const { Resolver, Mutation, Query, Arg, Int } = require("type-graphql");
const { getConnection} = require ("typeorm");
import { Post } from "../entity/Post";

@Resolver()
export class PostResolver {

  // Queries are used for getting data

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return getConnection().manager.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | null> {
    return getConnection().manager.findOne(Post, {id});
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
