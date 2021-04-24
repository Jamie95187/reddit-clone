"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
const express_1 = tslib_1.__importDefault(require("express"));
typeorm_1.createConnection().then((connection) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    console.log("Inserting a new post into the database...");
    const post = new Post_1.Post();
    post.title = "First Post";
    yield connection.manager.save(post);
    console.log("Saved a new post with id: " + post.id);
    console.log("Loading posts from the database...");
    const posts = yield connection.manager.find(Post_1.Post);
    console.log("Loaded users: ", posts);
    const app = express_1.default();
    app.listen(8080, () => {
        console.log('server started on localhost:8080');
    });
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map