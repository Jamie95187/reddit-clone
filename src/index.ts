import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import express from 'express';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');

// Unlike mikroOrm, the createConnection function automatically finds the ormconfig.json file as long as it is
// near the package.json (root directory)

createConnection().then(async connection => {

    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post);
    console.log("Loaded users: ", posts);

    const app = express();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver],,
        emitSchemaFile: true,
        validate: false
      }),
      context: () => ({ cm: connection.manager })
    });

  apolloServer.applyMiddleware({ app });

    app.listen(8080, () => {
      console.log('server started on localhost:8080')
    })

}).catch(error => console.log(error));
