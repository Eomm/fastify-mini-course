import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export default async function (fastifyInstance) {
  fastifyInstance.post("/upload", async function (req, reply) {
    const data = await req.file();

    await pipeline(data.file, createWriteStream(join(tmpdir(), data.filename)));
    return { success: data.filename };
  });
}
