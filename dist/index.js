import { __awaiter, __decorate, __metadata, __param } from "tslib";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const apolloServer = new ApolloServer({
        schema: yield buildSchema({
            resolvers: [PostResolver],
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
import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
let PostResolver = class PostResolver {
    posts() {
        return __awaiter(this, void 0, void 0, function* () {
            return getConnection().manager.find(Post, {});
        });
    }
    post(id) {
        return getConnection().manager.findOneOrFail(Post, { id });
    }
    createPost(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new Post();
            post.title = title;
            yield getConnection().manager.save(post);
            return post;
        });
    }
    updatePost(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getConnection()
                .createQueryBuilder()
                .update(Post)
                .set({
                title: title
            })
                .where("id = :id", { id: id })
                .execute();
            return "Success";
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getConnection()
                .createQueryBuilder()
                .delete()
                .from(Post)
                .where("id = :id", { id: id })
                .execute();
            return true;
        });
    }
};
__decorate([
    Query(() => [Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    Query(() => Post, { nullable: true }),
    __param(0, Arg('id', () => Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    Mutation(() => Post),
    __param(0, Arg("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    Mutation(() => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("title", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    Resolver()
], PostResolver);
export { PostResolver };
import { ObjectType, Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
let Post = class Post {
};
__decorate([
    Field(() => Number),
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    Field(() => String),
    CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "create_at", void 0);
__decorate([
    Field(() => String),
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "update_at", void 0);
__decorate([
    Field(),
    Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
Post = __decorate([
    ObjectType(),
    Entity()
], Post);
export { Post };
//# sourceMappingURL=index.js.map