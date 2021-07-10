import {
  InputType,
  Field
} from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string
  @Field()
  password: string
}
