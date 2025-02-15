import autoload from "@fastify/autoload";
import fastify from "fastify";
import { join } from "node:path";

const app = fastify({
  logger: true,
});

app.register(autoload, {
  dir: join(import.meta.dirname, "plugins"),
  options: {},
});
app.register(autoload, {
  dir: join(import.meta.dirname, "routes"),
  routeParams: true,
  options: {},
});

app.listen({ port: 3000 });
