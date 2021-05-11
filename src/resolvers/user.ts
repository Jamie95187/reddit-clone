const { Resolver, Query, Mutation, Arg, InputType, Field } = require("type-graphql");
import { MyContext } from '../types';
import { User } from '../entity/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg('options') options: UsernamePasswordInput,
  ) {
    const user = User.create(options);
    await user.save();
    return user;
  }
}
