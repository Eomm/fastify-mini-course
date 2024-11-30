import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.get("/users", async function () {
    const { rows } = await fastify.db.query("SELECT * FROM users");
    return rows;
  });
}
