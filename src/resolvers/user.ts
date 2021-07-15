const { Query, Resolver, Mutation, Arg, InputType, Field, ObjectType, Ctx } = require("type-graphql");
const argon2 = require ('argon2');
import { MyContext } from '../types';
import { getManager } from 'typeorm';
import { User } from '../entity/User';
import { COOKIE_NAME } from '../constants';
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";

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
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() {req} : MyContext
  ) {
    // const user = await getManager().findOne(User, { username: options.username });
    return true;
  }

  @Query(() => User, {nullable: true})
  async me(
    @Ctx() { req }: MyContext
  ) {
    console.log("session: ", req.session);
    // you are not logged in
    if (!req.session.userId) {
      return null
    }

    const user = await getManager().findOne(User, { id: req.session.userId });

    return user;
  }

  // Registering new users
  @Mutation(() => UserResponse)
  async createUser(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user = new User;
    user.id = 1;
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
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await getManager().findOne(User,
      usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
      );
    // User not found
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username does not exist',
          },
        ],
      };
    }
    // argon2 verify returns true or false
    const valid = await argon2.verify(user.password, password);
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
    // Can store entire user
    // req.session.user = user;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: MyContext
  ) {
    return new Promise((resolve)=>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true)
      })
    );
  };
}
