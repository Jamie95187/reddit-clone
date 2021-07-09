"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = tslib_1.__importDefault(require("express"));
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const redis_1 = tslib_1.__importDefault(require("redis"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const connect_redis_1 = tslib_1.__importDefault(require("connect-redis"));
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');
const cors_1 = tslib_1.__importDefault(require("cors"));
const constants_1 = require("./constants");
typeorm_1.createConnection().then((connection) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
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
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
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