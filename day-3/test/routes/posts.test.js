import { test } from "node:test";
import assert from "node:assert";
import { build } from "../helper.js";
import { newDb } from "pg-mem";

test("posts list", async (t) => {
  const db = newDb();
  db.getSchema().many(`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
  const { Client } = db.adapters.createPg();
  const client = new Client();

  const app = await build(t, { dbClient: client });

  const res = await app.inject({
    url: "/posts",
  });
  assert.deepStrictEqual(JSON.parse(res.payload), []);
});
