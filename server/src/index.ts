import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.status(200).send(users);
});

app
  .listen({ port: 4000 })
  .then(() => console.log("Server is running!"))
  .catch(() => console.log("Server error!"));
