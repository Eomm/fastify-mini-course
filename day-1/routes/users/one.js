import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.get("/users/:id", async function (req) {
    const { rows } = await fastify.db.query("SELECT * FROM users WHERE id=$1", [
      req.params.id,
    ]);
    return rows[0];
  });
}
