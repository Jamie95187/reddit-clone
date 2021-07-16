"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloResolver = void 0;
const tslib_1 = require("tslib");
const { Resolver, Query } = require("type-graphql");
let HelloResolver = class HelloResolver {
    hello() {
        return "hello world";
    }
};
tslib_1.__decorate([
    Query(() => String),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HelloResolver.prototype, "hello", null);
HelloResolver = tslib_1.__decorate([
    Resolver()
], HelloResolver);
exports.HelloResolver = HelloResolver;
//# sourceMappingURL=hello.js.map