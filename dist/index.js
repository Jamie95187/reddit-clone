import { __awaiter } from "tslib";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');
import cors from 'cors';
import { COOKIE_NAME } from './constants';
createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(session({
        name: COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        },
        saveUninitialized: false,
        secret: 'qwewqeqqadsdqwdasdadq',
        resave: false,
    }));
    const apolloServer = new ApolloServer({
        schema: yield buildSchema({
            resolvers: [PostResolver, UserResolver],
            emitSchemaFile: true,
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(8080, () => {
        console.log('server started on localhost:8080');
    });
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map