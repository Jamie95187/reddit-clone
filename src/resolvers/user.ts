const { Resolver, Query, Mutation, Arg, InputType, Field } = require("type-graphql");
const argon2 from 'argon2';
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
    const hashedPassword = await argon2.hash(options.password);
    const user = User.create(User, { username: options.username, password: hashedPassword });
    await user.save();
    return user;
  }
}
