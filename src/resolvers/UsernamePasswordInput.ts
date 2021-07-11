const { InputType, Field } = require("type-graphql");

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string
  @Field()
  password: string
}
