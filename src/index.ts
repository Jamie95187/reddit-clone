import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";

createConnection().then(async connection => {

    console.log("Inserting a new post into the database...");
    const post = new Post();
    post.title = "First Post";
    await connection.manager.save(post);
    console.log("Saved a new post with id: " + post.id);

    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post);
    console.log("Loaded users: ", posts);

}).catch(error => console.log(error));
