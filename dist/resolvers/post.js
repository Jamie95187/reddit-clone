"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { Resolver, Query, Ctx, Arg, Int } = require("type-graphql");
const Post_1 = require("../entity/Post");
let PostResolver = class PostResolver {
    posts({ cm }) {
        return cm.find(Post_1.Post, {});
    }
    post(id, { cm }) {
        return cm.findOne(Post_1.Post, { id });
    }
};
tslib_1.__decorate([
    Query(() => [Post_1.Post]),
    tslib_1.__param(0, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
tslib_1.__decorate([
    Query(() => Post_1.Post, { nullable: true }),
    tslib_1.__param(0, Arg('id', () => Int)),
    tslib_1.__param(1, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
PostResolver = tslib_1.__decorate([
    Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map