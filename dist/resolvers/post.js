"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { Resolver, Query, Ctx } = require("type-graphql");
const Post_1 = require("../entity/Post");
let PostResolver = class PostResolver {
    posts(ctx) {
        console.log(MyContext.posts_array);
        return ctx;
    }
};
tslib_1.__decorate([
    Query(() => [Post_1.Post]),
    tslib_1.__param(0, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostResolver.prototype, "posts", null);
PostResolver = tslib_1.__decorate([
    Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map