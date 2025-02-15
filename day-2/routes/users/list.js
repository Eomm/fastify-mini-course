import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  fastifyInstance.get('/users', async function () {
    const { rows } = await fastifyInstance.db.query("SELECT * FROM users");
    return rows;
  })
}
