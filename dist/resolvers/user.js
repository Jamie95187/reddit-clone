"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const tslib_1 = require("tslib");
const { Query, Resolver, Mutation, Arg, InputType, Field, ObjectType, Ctx } = require("type-graphql");
const argon2 = require('argon2');
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const constants_1 = require("../constants");
const validateRegister_1 = require("../utils/validateRegister");
const UsernamePasswordInput_1 = require("./UsernamePasswordInput");
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
    forgotPassword(email, { req }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    me({ req }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("session: ", req.session);
            if (!req.session.userId) {
                return null;
            }
            const user = yield typeorm_1.getManager().findOne(User_1.User, { id: req.session.userId });
            return user;
        });
    }
    createUser(options, { req }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const errors = validateRegister_1.validateRegister(options);
            if (errors) {
                return { errors };
            }
            const hashedPassword = yield argon2.hash(options.password);
            let user = new User_1.User;
            user.id = 1;
            user.username = options.username;
            user.password = hashedPassword;
            try {
                yield typeorm_1.getManager().save(user);
            }
            catch (err) {
                if (err.message.includes("duplicate key value violates unique constraint")) {
                    return {
                        errors: [{
                                field: 'username',
                                message: "username already taken"
                            }]
                    };
                }
            }
            req.session.userId = user.id;
            return { user };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_1.getManager().findOne(User_1.User, usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
            if (!user) {
                return {
                    errors: [
                        {
                            field: 'usernameOrEmail',
                            message: 'username does not exist',
                        },
                    ],
                };
            }
            const valid = yield argon2.verify(user.password, password);
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
            req.session.userId = user.id;
            return {
                user,
            };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    ;
};
tslib_1.__decorate([
    Mutation(() => Boolean),
    tslib_1.__param(0, Arg('email')),
    tslib_1.__param(1, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
tslib_1.__decorate([
    Query(() => User_1.User, { nullable: true }),
    tslib_1.__param(0, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
tslib_1.__decorate([
    Mutation(() => UserResponse),
    tslib_1.__param(0, Arg('options')),
    tslib_1.__param(1, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UsernamePasswordInput_1.UsernamePasswordInput, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
tslib_1.__decorate([
    Mutation(() => UserResponse),
    tslib_1.__param(0, Arg('usernameOrEmail')),
    tslib_1.__param(1, Arg("password")),
    tslib_1.__param(2, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
tslib_1.__decorate([
    Mutation(() => Boolean),
    tslib_1.__param(0, Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = tslib_1.__decorate([
    Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map