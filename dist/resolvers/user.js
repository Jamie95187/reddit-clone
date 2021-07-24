import { __awaiter, __decorate, __metadata, __param } from "tslib";
const { Query, Resolver, Mutation, Arg, InputType, Field, ObjectType, Ctx } = require("type-graphql");
const argon2 = require('argon2');
import { getManager } from 'typeorm';
import { User } from '../entity/User';
import { COOKIE_NAME } from '../constants';
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
let FieldError = class FieldError {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    forgotPassword(email, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("session: ", req.session);
            if (!req.session.userId) {
                return null;
            }
            const user = yield getManager().findOne(User, { id: req.session.userId });
            return user;
        });
    }
    createUser(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateRegister(options);
            if (errors) {
                return { errors };
            }
            const hashedPassword = yield argon2.hash(options.password);
            let user = new User;
            user.id = 1;
            user.username = options.username;
            user.password = hashedPassword;
            try {
                yield getManager().save(user);
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
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield getManager().findOne(User, usernameOrEmail.includes('@')
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
            res.clearCookie(COOKIE_NAME);
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
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg('email')),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    Query(() => User, { nullable: true }),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Arg('options')),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Arg('usernameOrEmail')),
    __param(1, Arg("password")),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    Resolver()
], UserResolver);
export { UserResolver };
//# sourceMappingURL=user.js.map