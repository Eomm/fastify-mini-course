import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);
  const oneUserSchema = {
    params: {
      required: ["id"],
      type: "object",
      properties: {
        id: { type: "number" }
      }
    },
  }

  fastifyInstance.get('/users/:id', { schema: oneUserSchema }, async function (req) {
    const { rows } = await fastifyInstance.db.query("SELECT * FROM users WHERE id=$1", [
      req.params.id,
    ]);
    return rows[0];
  })
}
