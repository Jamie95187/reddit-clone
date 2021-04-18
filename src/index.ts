import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import express from 'express';

// Unlike mikroOrm, the createConnection function automatically finds the ormconfig.json file as long as it is
// near the package.json (root directory)

createConnection().then(async connection => {

    console.log("Inserting a new post into the database...");
    const post = new Post();
    post.title = "First Post";
    await connection.manager.save(post);
    console.log("Saved a new post with id: " + post.id);

    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post);
    console.log("Loaded users: ", posts);

    const app = express();
    app.get('/', (_, res) => {
      res.send("hello");
    })
    app.listen(3030, () => {
      console.log('server started on localhost:3030')
    })

}).catch(error => console.log(error));
