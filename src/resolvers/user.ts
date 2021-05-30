const { Query, Resolver, Mutation, Arg, InputType, Field, ObjectType, Ctx } = require("type-graphql");
const argon2 = require ('argon2');
import { MyContext } from '../types';
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
  @Query(() => User, {nullable: true})
  async me(
    @Ctx() { req }: MyContext
  ) {

    // you are not logged in
    if (!req.session.userId) {
      return null
    }

    const user = await getManager().findOne(User, { id: !req.session.userId });

    return user;
  }

  // Registering new users
  @Mutation(() => UserResponse)
  async createUser(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
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
      // console.log("message:", err.message);
    }

    // store user id Session
    // this will set a cookie to the user
    // keep user logged in
    req.session.userId = user.id;

    return { user };
  }

  // Logging in

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
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

    req.session!.userId = user.id;
    console.log(user.id);

    return {
      user,
    };
  }
}
