"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
typeorm_1.createConnection().then(async (connection) => {
    console.log("Inserting a new post into the database...");
    const post = new Post_1.Post();
    post.title = "First Post";
    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post_1.Post);
    console.log("Loaded users: ", posts);
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map