import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "jwt-secret",
});

app.register(memoriesRoutes);
app.register(authRoutes);

app
  .listen({ port: 4000, host: "0.0.0.0" })
  .then(() => console.log("Server is running!"))
  .catch(() => console.log("Server error!"));
