import { __decorate, __metadata } from "tslib";
const { InputType, Field } = require("type-graphql");
let UsernamePasswordInput = class UsernamePasswordInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "email", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
UsernamePasswordInput = __decorate([
    InputType()
], UsernamePasswordInput);
export { UsernamePasswordInput };
//# sourceMappingURL=UsernamePasswordInput.js.map