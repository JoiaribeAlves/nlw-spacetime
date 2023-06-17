import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (req, reply) => {
    await req.jwtVerify();
  });

  app.get("/memories", async (req, reply) => {
    try {
      const memories = await prisma.memory.findMany({
        where: {
          userId: req.user.sub,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 120).concat("..."),
          createdAt: memory.createdAt,
        };
      });
    } catch (error) {
      return reply.status(500);
    }
  });

  app.get("/memories/:id", async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    try {
      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (!memory.isPublic && memory.userId !== req.user.sub) {
        return reply.status(403);
      }

      return memory;
    } catch (error) {
      return reply.status(500);
    }
  });

  app.post("/memories", async (req, reply) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    try {
      const memory = await prisma.memory.create({
        data: {
          content,
          coverUrl,
          isPublic,
          userId: req.user.sub,
        },
      });

      return memory;
    } catch (error) {
      return reply.status(500);
    }
  });

  app.put("/memories/:id", async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    try {
      let memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (memory.userId !== req.user.sub) {
        return reply.status(403);
      }

      memory = await prisma.memory.update({
        where: {
          id,
        },
        data: {
          content,
          coverUrl,
          isPublic,
        },
      });

      return memory;
    } catch (error) {
      return reply.status(500);
    }
  });

  app.delete("/memories/:id", async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    try {
      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (memory.userId !== req.user.sub) {
        return reply.status(403);
      }

      await prisma.memory.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return reply.status(500);
    }
  });
}
