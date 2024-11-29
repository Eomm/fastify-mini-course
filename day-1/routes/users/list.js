import pg from "pg";

export default async function (fastify, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.get("/users", async function () {
    const { rows } = await client.query("SELECT * FROM users");
    return rows;
  });
}
