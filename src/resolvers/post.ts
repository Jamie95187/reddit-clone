const { Resolver, Query, Ctx } = require("type-graphql");
import { Post } from "../entity/Post";
import { MyContext } from '../types';

@Resolver()
export class PostResolver {

  // @Query(() => Post)
  // post(@Ctx() ctx: MyContext) {
  //   return ctx.post;
  // }

  @Query(() => [Post])
  posts(@Ctx() { cm }: MyContext){
    return cm.find(Post);
  }
}
