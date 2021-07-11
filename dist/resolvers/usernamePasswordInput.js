"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { InputType, Field } = require("type-graphql");
let UsernamePasswordInput = class UsernamePasswordInput {
};
tslib_1.__decorate([
    Field(),
    tslib_1.__metadata("design:type", String)
], UsernamePasswordInput.prototype, "email", void 0);
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
exports.UsernamePasswordInput = UsernamePasswordInput;
//# sourceMappingURL=UsernamePasswordInput.js.map