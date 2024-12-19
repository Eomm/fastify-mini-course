import { getConfig, loadConfig } from './config.js';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function myPlugin(fastify, opts) {
  await loadConfig();
  fastify.decorate('config', () => getConfig());

  setInterval(async () => {
    await loadConfig();
    fastify.log.info('Configuration reloaded.');
  }, 5000);
})
