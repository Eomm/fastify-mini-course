import pg from "pg";

export default async function (fastify, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.post("/users", async function (req) {
    const text = "INSERT INTO users(email) VALUES($1) RETURNING *";
    const values = [req.body.email];

    const { rows } = await client.query(text, values);
    return rows[0];
  });
}
