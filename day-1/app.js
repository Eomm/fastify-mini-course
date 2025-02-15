import fastify from "fastify";
import pg from 'pg'

const app = fastify({
  logger: true,
});

const basicDBConfig = {
  user: "basic_user",
  password: "basic_password",
  host: "127.0.0.1",
  port: 5432,
  database: "fastify",
};

const client = new pg.Client(basicDBConfig)
await client.connect();
// This is to safely close the connection to the database
app.addHook('onClose', (fastifyInstance, done) => client.end(done))

app.get('/users', async function () {
  const { rows } = await client.query("SELECT * FROM users");
  return rows;
})

const oneUserSchema = {
  params: {
    required: ["id"],
    type: "object",
    properties: {
      id: { type: "number" }
    }
  },
}
app.get('/users/:id', { schema: oneUserSchema }, async function (req) {
  const { rows } = await client.query("SELECT * FROM users WHERE id=$1", [
    req.params.id,
  ]);
  return rows[0];
})


const createUserSchema = {
  body: {
    required: ["email"],
    type: "object",
    properties: {
      email: { type: "string" }
    }
  },
}
app.post('/users', { schema: createUserSchema }, async function (req) {
  const text = "INSERT INTO users(email) VALUES($1) RETURNING *";
  const values = [req.body.email];

  const { rows } = await client.query(text, values);
  return rows[0];
})

app.listen({ port: 3000 });
