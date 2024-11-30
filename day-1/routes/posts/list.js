import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.get("/posts", async function () {
    const { rows } = await fastify.db.query("SELECT * FROM posts");
    return rows;
  });
}
