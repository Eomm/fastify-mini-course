import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.post("/posts", async function (req) {
    const text =
      "INSERT INTO posts(content, userId) VALUES($1, $2) RETURNING *";
    const values = [req.body.content, req.body.userId];

    const { rows } = await fastify.db.query(text, values);
    return rows[0];
  });
}
