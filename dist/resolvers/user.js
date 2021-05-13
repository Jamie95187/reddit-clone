"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { Resolver, Mutation, Arg, InputType, Field, ObjectType } = require("type-graphql");
const argon2 = require('argon2');
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
let UsernamePasswordInput = class UsernamePasswordInput {
};
tslib_1.__decorate([
    Field(),
    tslib_1.__metadata("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
tslib_1.__decorate([
    Field(),
    tslib_1.__metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
UsernamePasswordInput = tslib_1.__decorate([
    InputType()
], UsernamePasswordInput);
let FieldError = class FieldError {
};
tslib_1.__decorate([
    Field(),
    tslib_1.__metadata("design:type", String)
], FieldError.prototype, "field", void 0);
tslib_1.__decorate([
    Field(),
    tslib_1.__metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = tslib_1.__decorate([
    ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
tslib_1.__decorate([
    Field(() => [FieldError], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
tslib_1.__decorate([
    Field(() => User_1.User, { nullable: true }),
    tslib_1.__metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = tslib_1.__decorate([
    ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    createUser(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (options.username.length <= 2) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "length must be greater than 2",
                        },
                    ],
                };
            }
            if (options.password.length <= 3) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "length must be greater than 3",
                        },
                    ],
                };
            }
            const hashedPassword = yield argon2.hash(options.password);
            let user = new User_1.User;
            user.username = options.username;
            user.password = hashedPassword;
            try {
                yield typeorm_1.getManager().save(user);
            }
            catch (err) {
                console.log("message: ", err.message);
            }
            return { user };
        });
    }
    login(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_1.getManager().findOne(User_1.User, { username: options.username });
            if (!user) {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username does not exist',
                        },
                    ],
                };
            }
            const valid = yield argon2.verify(user.password, options.password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "incorrect password",
                        },
                    ],
                };
            }
            return {
                user,
            };
        });
    }
};
tslib_1.__decorate([
    Mutation(() => UserResponse),
    tslib_1.__param(0, Arg('options')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UsernamePasswordInput]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
tslib_1.__decorate([
    Mutation(() => UserResponse),
    tslib_1.__param(0, Arg('options')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UsernamePasswordInput]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = tslib_1.__decorate([
    Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map