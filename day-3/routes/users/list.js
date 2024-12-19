import db from "../../plugins/db.js";

export default async function (fastify, opts) {
  await fastify.register(db, opts);

  fastify.get("/", async function () {
    const { rows } = await fastify.db.query("SELECT * FROM users");
    throw new Error('errororororro')
    return rows;
  });
}

export const autoConfig = (fastify) => {
  return {
    dbConfig: fastify.limitedDBConfig
  }
}
