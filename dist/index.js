"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
typeorm_1.createConnection().then(async (connection) => {
    console.log("Inserting a new post into the database...");
    const post = new Post_1.Post();
    post.title = "First Post";
    await connection.manager.save(post);
    console.log("Saved a new post with id: " + post.id);
    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post_1.Post);
    console.log("Loaded users: ", posts);
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver],
            validation: false
        }),
        context: () => ({ posts })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(8080, () => {
        console.log('server started on localhost:8080');
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map