import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  fastifyInstance.get("/", async function () {
    const { rows } = await fastifyInstance.db.query("SELECT * FROM posts");
    return rows;
  });
}

export const autoConfig = function (fastifyInstance) {
  return { dbConfig: fastifyInstance.limitedDBConfig };
};
