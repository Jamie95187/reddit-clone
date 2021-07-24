import { __decorate, __metadata } from "tslib";
const { Resolver, Query } = require("type-graphql");
let HelloResolver = class HelloResolver {
    hello() {
        return "hello world";
    }
};
__decorate([
    Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloResolver.prototype, "hello", null);
HelloResolver = __decorate([
    Resolver()
], HelloResolver);
export { HelloResolver };
//# sourceMappingURL=hello.js.map