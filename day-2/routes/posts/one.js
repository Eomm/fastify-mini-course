import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  const onePostSchema = {
    params: {
      required: ["id"],
      type: "object",
      properties: {
        id: { type: "number" }
      }
    },
  }

  fastifyInstance.get('/posts/:id', { schema: onePostSchema }, async function (req) {
    const { rows } = await fastifyInstance.db.query("SELECT * FROM posts WHERE id=$1", [
      req.params.id,
    ]);
    return rows[0];
  })
}
