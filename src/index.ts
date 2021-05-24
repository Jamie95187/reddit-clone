import "reflect-metadata";
import { createConnection } from "typeorm";
import { MyContext } from './types';
import express from 'express';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');

// Unlike mikroOrm, the createConnection function automatically finds the ormconfig.json file as long as it is
// near the package.json (root directory)

createConnection().then(async connection => {

    // console.log("Loading posts from the database...");
    // const posts = await connection.manager.find(Post);
    // console.log("Loaded users: ", posts);

    const app = express();

    // Use Docker container with redis
    // Connect to redis using docker in cmd "docker run -d -p 6379:6379 --name redis1 redis"
    // User 'docker container start redis1'
    // 'docker exec -it redis1 sh'
    // '# redis-cli'

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    // Session middleware needs to be added before the apollo middleware because we will use
    // session inside apolloserver

    app.use(
      session({
        name: 'qid',
        store: new RedisStore({
          client: redisClient,
          disableTouch: true
         }),
         cookie: {
           maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
           httpOnly: true,
           sameSite: 'lax', // csrf
           secure: true // cookie only works in https
         },
        saveUninitialized: false,
        secret: 'qwewqeqqadsdqwdasdadq',
        resave: false,
      })
    )

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        emitSchemaFile: true,
        validate: false
      }),
      context: ({ req, res }): MyContext => ({  req, res })
    });

  apolloServer.applyMiddleware({ app });

    app.listen(8080, () => {
      console.log('server started on localhost:8080')
    })

}).catch(error => console.log(error));
