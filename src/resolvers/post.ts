const { Resolver, Query, Ctx } = require("type-graphql");
import { Post } from "../entity/Post";
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext) {
    console.log(MyContext.posts_array);
    return ctx;
  }
}
