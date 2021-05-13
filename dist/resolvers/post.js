"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { Resolver, Mutation, Query, Arg, Int } = require("type-graphql");
const { getConnection } = require("typeorm");
const Post_1 = require("../entity/Post");
let PostResolver = class PostResolver {
    posts() {
        return getConnection().manager.find(Post_1.Post, {});
    }
    post(id) {
        return getConnection().manager.findOne(Post_1.Post, { id });
    }
    createPost(title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = new Post_1.Post();
            post.title = title;
            yield getConnection().manager.save(post);
            return post;
        });
    }
    updatePost(id, title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield getConnection()
                .createQueryBuilder()
                .update(Post_1.Post)
                .set({
                title: title
            })
                .where("id = :id", { id: id })
                .execute();
            return "Success";
        });
    }
    deletePost(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield getConnection()
                .createQueryBuilder()
                .delete()
                .from(Post_1.Post)
                .where("id = :id", { id: id })
                .execute();
            return true;
        });
    }
};
tslib_1.__decorate([
    Query(() => [Post_1.Post]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
tslib_1.__decorate([
    Query(() => Post_1.Post, { nullable: true }),
    tslib_1.__param(0, Arg('id', () => Int)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
tslib_1.__decorate([
    Mutation(() => Post_1.Post),
    tslib_1.__param(0, Arg("title", () => String)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
tslib_1.__decorate([
    Mutation(() => String, { nullable: true }),
    tslib_1.__param(0, Arg("id")),
    tslib_1.__param(1, Arg("title", () => String, { nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
tslib_1.__decorate([
    Mutation(() => Boolean),
    tslib_1.__param(0, Arg("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = tslib_1.__decorate([
    Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map