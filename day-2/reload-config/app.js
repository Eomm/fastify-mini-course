import Fastify from 'fastify';
import myPlugin from './plugin.js';

const fastify = Fastify({ logger: true });

await fastify.register(myPlugin);

fastify.get('/config', async (request, reply) => {
  return fastify.config();
});

fastify.listen({ port: 3000 })

