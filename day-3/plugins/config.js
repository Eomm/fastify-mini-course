
import fastifyEnv from "@fastify/env";
import fastifyPlugin from "fastify-plugin";

async function configPlugin(fastify, options) {
  const schema = {
    type: "object",
    required: ["DB_HOST", "BASIC_USER", "BASIC_PASSWORD", "LIMITED_USER", "LIMITED_PASSWORD", "DATABASE"],
    properties: {
      PORT: { type: "number", default: 3000 },
      NODE_ENV: { type: "string", default: "production" },
      BASIC_USER: { type: "string" },
      BASIC_PASSWORD: { type: "string" },
      LIMITED_USER: { type: "string" },
      LIMITED_PASSWORD: { type: "string" },
      DB_HOST: { type: "string" },
      DB_PORT: { type: "number", default: 5432 },
      DATABASE: { type: "string" },
    },
  };

  const configOptions = {
    // decorate the Fastify server instance with `config` key
    // such as `fastify.config('PORT')
    confKey: "config",
    // schema to validate
    schema: schema,
    // source for the configuration data
    data: process.env,
    // will read .env in root folder
    dotenv: true,
    // will remove the additional properties
    // from the data object which creates an
    // explicit schema
    removeAdditional: true,
  };

  await fastify.register(fastifyEnv, configOptions);

  const commonDBConfig = {
    port: fastify.config.DB_PORT,
    host: fastify.config.DB_HOST,
    database: fastify.config.DATABASE
  }
  fastify.decorate('basicDBConfig', {
    ...commonDBConfig,
    user: fastify.config.BASIC_USER,
    password: fastify.config.BASIC_PASSWORD,
  })
  fastify.decorate('limitedDBConfig', {
    ...commonDBConfig,
    user: fastify.config.LIMITED_USER,
    password: fastify.config.LIMITED_PASSWORD,
  })
}

export default fastifyPlugin(configPlugin);
