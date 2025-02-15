import fastifyPlugin from "fastify-plugin";
import pg from "pg";

async function dbPlugin(fastifyInstance, opts) {
  const client = new pg.Client(opts.dbConfig);
  await client.connect();

  fastifyInstance.addHook('onClose', (fastifyInstance, done) => client.end(done))
  fastifyInstance.decorate("db", client);
}

export default fastifyPlugin(dbPlugin);
