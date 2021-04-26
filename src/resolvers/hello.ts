const { Resolver, Query } = require("type-graphql");

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world"
  }
}
