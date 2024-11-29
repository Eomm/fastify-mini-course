import pg from "pg";

export default async function (fastify, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.get("/users/:id", async function (req) {
    const { rows } = await client.query("SELECT * FROM users WHERE id=$1", [
      req.params.id,
    ]);
    return rows[0];
  });
}
