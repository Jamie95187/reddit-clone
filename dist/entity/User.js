import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";
import { ObjectType, Field } from "type-graphql";
let User = class User {
};
__decorate([
    Field(() => Number),
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Field(() => String),
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "create_at", void 0);
__decorate([
    Field(() => String),
    UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "update_at", void 0);
__decorate([
    Field(),
    Column({ name: 'user_name' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Field(),
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    ObjectType(),
    Entity(),
    Unique(["username"])
], User);
export { User };
//# sourceMappingURL=User.js.map