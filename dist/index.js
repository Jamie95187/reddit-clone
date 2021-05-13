"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = tslib_1.__importDefault(require("express"));
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');
typeorm_1.createConnection().then((connection) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const app = express_1.default();
    const apolloServer = new ApolloServer({
        schema: yield buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            emitSchemaFile: true,
            validate: false
        }),
        context: () => ({ cm: connection.manager })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(8080, () => {
        console.log('server started on localhost:8080');
    });
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map