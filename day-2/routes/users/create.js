import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  const createUserSchema = {
    body: {
      required: ["email"],
      type: "object",
      properties: {
        email: { type: "string" }
      }
    },
  }
  fastifyInstance.post('/users', { schema: createUserSchema }, async function (req) {
    const text = "INSERT INTO users(email) VALUES($1) RETURNING *";
    const values = [req.body.email];

    const { rows } = await fastifyInstance.db.query(text, values);
    return rows[0];
  })
}
