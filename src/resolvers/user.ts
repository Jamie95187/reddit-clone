const { Resolver, Query, Mutation, Arg, InputType, Field, ObjectType } = require("type-graphql");
const argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() [Error], {nullable: true})
  errors?: FieldError[];

  @Field(() => User, {nullable: true})
  user?: User;
}

@Resolver()
export class UserResolver {

  // Registering new users
  @Mutation(() => UserResponse)
  async createUser(
    @Arg('options') options: UsernamePasswordInput,
  ): Promise<UserResponse> {

    // Validation
    if (options.username.length <= 2) {
      return {
          errors: [
            {
              field: "username",
              message: "length must be greater than 2",
            },
        ],
      };
    }

    if (options.password.length <= 3) {
      return {
          errors: [
            {
              field: "password",
              message: "length must be greater than 2",
            },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = User.create(User, { username: options.username, password: hashedPassword });
    await user.save();
    return { user };
  }

  // Logging in
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
  ): Promise<UserResponse> {
    const user = await getManager().findOne(User, { username: options.username });
    // User not found
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username does not exist',
          },
        ],
      };
    }
    // argon2 verify returns true or false
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
