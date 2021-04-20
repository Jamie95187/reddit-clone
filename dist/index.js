"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Post_1 = require("./entity/Post");
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var type_graphql_1 = require("type-graphql");
var hello_1 = require("./resolvers/hello");
var post_1 = require("./resolvers/post");
typeorm_1.createConnection().then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var post, posts, app, apolloServer, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("Inserting a new post into the database...");
                post = new Post_1.Post();
                post.title = "First Post";
                return [4, connection.manager.save(post)];
            case 1:
                _c.sent();
                console.log("Saved a new post with id: " + post.id);
                console.log("Loading posts from the database...");
                return [4, connection.manager.find(Post_1.Post)];
            case 2:
                posts = _c.sent();
                console.log("Loaded users: ", posts);
                app = express_1.default();
                _a = apollo_server_express_1.ApolloServer.bind;
                _b = {};
                return [4, type_graphql_1.buildSchema({
                        resolvers: [hello_1.HelloResolver, post_1.PostResolver],
                        validation: false
                    })];
            case 3:
                apolloServer = new (_a.apply(apollo_server_express_1.ApolloServer, [void 0, (_b.schema = _c.sent(),
                        _b.context = function () { return ({ posts: posts }); },
                        _b)]))();
                apolloServer.applyMiddleware({ app: app });
                app.listen(8080, function () {
                    console.log('server started on localhost:8080');
                });
                return [2];
        }
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map