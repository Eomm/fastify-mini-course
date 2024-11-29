import pg from "pg";

export default async function (fastify, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.post("/posts", async function (req) {
    const text =
      "INSERT INTO posts(content, userId) VALUES($1, $2) RETURNING *";
    const values = [req.body.content, req.body.userId];

    const { rows } = await client.query(text, values);
    return rows[0];
  });
}
