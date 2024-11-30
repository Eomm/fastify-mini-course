import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.post("/users", async function (req) {
    const text = "INSERT INTO users(email) VALUES($1) RETURNING *";
    const values = [req.body.email];

    const { rows } = await fastify.db.query(text, values);
    return rows[0];
  });
}
