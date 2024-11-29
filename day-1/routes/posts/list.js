import pg from "pg";

export default async function (fastify, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.get("/posts", async function () {
    const { rows } = await client.query("SELECT * FROM posts");
    return rows;
  });
}
