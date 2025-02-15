import fastifyPlugin from "fastify-plugin";
import pg from "pg";

export default fastifyPlugin(
  async function (fastifyInstance, opts) {
    const client = new pg.Client(opts.dbConfig);
    await client.connect();

    fastifyInstance.addHook("onClose", (fastifyInstance, done) =>
      client.end(done),
    );
    fastifyInstance.decorate("db", client);
  },
  {
    dependencies: ["appConfig"],
  },
);

export const autoload = false;
