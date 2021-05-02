const { Resolver, Query, Ctx } = require("type-graphql");
import { Post } from "../entity/Post";
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { cm }: MyContext): Promise<Post[]> {
    return cm.find(Post, {});
  }
}
