"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = (options) => {
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.password.length <= 3) {
        return [
            {
                field: "password",
                message: "length must be greater than 3",
            },
        ];
    }
    if (!options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "cannot include @",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map