import { __awaiter, __decorate, __metadata, __param } from "tslib";
import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../entity/Post";
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
//# sourceMappingURL=post.js.map