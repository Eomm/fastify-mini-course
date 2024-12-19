import fastifyPlugin from "fastify-plugin";
import pg from "pg";

export default fastifyPlugin(async function (fastify, opts) {
  const client = opts.dbClient ?? new pg.Client(opts.dbConfig);
  await client.connect();

  fastify.decorate("db", client);
});

export const autoload = false;
