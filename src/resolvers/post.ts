const { Resolver, Query, Ctx, Arg, Int } = require("type-graphql");
import { Post } from "../entity/Post";
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { cm }: MyContext): Promise<Post[]> {
    return cm.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number,
       @Ctx() { cm }: MyContext): Promise<Post | null> {
    return cm.findOne(Post, {id});
  }
}
