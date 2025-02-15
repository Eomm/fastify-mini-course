import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  const createPostSchema = {
    body: {
      required: ["userId", "content"],
      type: "object",
      properties: {
        userId: { type: "string" },
        content: { type: "string" },
      },
    },
  };
  fastifyInstance.post("/", { schema: createPostSchema }, async function (req) {
    const text =
      "INSERT INTO posts(userId, content) VALUES($1, $2) RETURNING *";
    const values = [req.body.userId, req.body.content];

    const { rows } = await fastifyInstance.db.query(text, values);
    return rows[0];
  });
}

export const autoConfig = function (fastifyInstance) {
  return { dbConfig: fastifyInstance.basicDBConfig };
};
