import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { FastifyInstance } from "fastify";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (req, reply) => {
    const data = await req.file({
      limits: {
        fileSize: 5242880, // 5mb
        files: 1,
      },
    });

    if (!data) {
      return reply.status(400).send({ message: "Nenhum arquivo anexado." });
    }

    const mimetypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimetypeRegex.test(data.mimetype);

    if (!isValidFileFormat) {
      return reply
        .status(406)
        .send({ message: "Formato de arquivo não suportado." });
    }

    const fileId = randomUUID();
    const extension = extname(data.filename);
    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads/", fileName)
    );

    await pump(data.file, writeStream);

    const fullUrl = req.protocol.concat("://").concat(req.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return { fileUrl };
  });
}
