import db from "../../plugins/db.js";

export default async function (fastifyInstance, opts) {
  fastifyInstance.register(db, opts);

  fastifyInstance.get('/posts', async function () {
    const { rows } = await fastifyInstance.db.query("SELECT * FROM posts");
    return rows;
  })
}
