"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const { ObjectType, Field } = require("type-graphql");
let User = class User {
};
tslib_1.__decorate([
    Field(() => Number),
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    Field(() => String),
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "create_at", void 0);
tslib_1.__decorate([
    Field(() => String),
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "update_at", void 0);
tslib_1.__decorate([
    Field(),
    typeorm_1.Column({ name: 'user_name' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
User = tslib_1.__decorate([
    ObjectType(),
    typeorm_1.Entity(),
    typeorm_1.Unique(["username"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map