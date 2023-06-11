import fastify from "fastify";
import cors from "@fastify/cors";

import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(memoriesRoutes);
app.register(cors, {
  origin: true,
});

app
  .listen({ port: 4000 })
  .then(() => console.log("Server is running!"))
  .catch(() => console.log("Server error!"));
