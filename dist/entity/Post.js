import { __decorate, __metadata } from "tslib";
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
//# sourceMappingURL=Post.js.map