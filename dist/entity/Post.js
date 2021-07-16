"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const { ObjectType, Field } = require("type-graphql");
let Post = class Post {
};
tslib_1.__decorate([
    Field(() => Number),
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    Field(() => String),
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "create_at", void 0);
tslib_1.__decorate([
    Field(() => String),
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "update_at", void 0);
tslib_1.__decorate([
    Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
Post = tslib_1.__decorate([
    ObjectType(),
    typeorm_1.Entity()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map