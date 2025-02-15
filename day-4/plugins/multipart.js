import fastifyPlugin from "fastify-plugin";
import multipart from "@fastify/multipart";

export default fastifyPlugin(async function (fastifyInstance, opts) {
  fastifyInstance.register(multipart, opts);
});
