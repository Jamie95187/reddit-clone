const { Resolver, Mutation, Arg, InputType, Field, ObjectType } = require("type-graphql");
const argon2 = require ('argon2');
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
  @Field(() => [FieldError], {nullable: true})
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
              message: "length must be greater than 3",
            },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user = new User;
    // user.id = 1;
    user.username = options.username;
    user.password = hashedPassword;
    try {
      await getManager().save(user);
    } catch(err) {
      // Duplicate user name error
      if (err.message.includes("duplicate key value violates unique constraint")) {
        return {
          errors: [{
            field: 'username',
            message: "username already taken"
          }]
        }
      }
      console.log("message:", err.message);
    }
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
