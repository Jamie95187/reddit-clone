"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } = require("typeorm");
const { ObjectType, Field } = require("type-graphql");
let Post = class Post {
};
tslib_1.__decorate([
    Field(() => Number),
    PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    Field(() => String),
    CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "create_at", void 0);
tslib_1.__decorate([
    Field(() => String),
    UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "update_at", void 0);
tslib_1.__decorate([
    Field(),
    Column(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
Post = tslib_1.__decorate([
    ObjectType(),
    Entity()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map