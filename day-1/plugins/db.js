import fastifyPlugin from "fastify-plugin";
import pg from "pg";

export default fastifyPlugin(async function (fastify, opts) {
  const client = new pg.Client(opts.clientConfig);
  await client.connect();

  fastify.decorate("db", client);
});
