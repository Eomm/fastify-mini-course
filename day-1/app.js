import fastify from "fastify";
import listUsers from "./routes/users/list.js";
import oneUser from "./routes/users/one.js";
import createUser from "./routes/users/create.js";
import listPosts from "./routes/posts/list.js";
import onePost from "./routes/posts/one.js";
import createPost from "./routes/posts/create.js";

const app = fastify({
  logger: true,
});

const basicDBConfig = {
  user: "basic_user",
  password: "basic_password",
  host: "127.0.0.1",
  port: 5432,
  database: "fastify",
};

const limitedDBConfig = {
  user: "limited_user",
  password: "limited_password",
  host: "127.0.0.1",
  port: 5432,
  database: "fastify",
};

app.register(listUsers, { dbConfig: limitedDBConfig });
app.register(oneUser, { dbConfig: limitedDBConfig });
app.register(createUser, { dbConfig: basicDBConfig });
app.register(listPosts, { dbConfig: limitedDBConfig });
app.register(onePost, { dbConfig: limitedDBConfig });
app.register(createPost, { dbConfig: basicDBConfig });

app.listen({ port: 3000 });
