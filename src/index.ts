import fastify from "fastify";
import { fastifySocketIoPlugin } from "./plugins/fastify-socketio.plugin";

import fastifyStatic from "@fastify/static";
import { socketIoBootstrap } from "./bootstrap/socketio.bootstrap";
import { fastifyStaticConfig } from "./config/fastify-static.config";
import { logger } from "./logging/logger";

const app = fastify();

app.register(fastifySocketIoPlugin);
app.register(fastifyStatic, fastifyStaticConfig);

app.listen({ port: 3000 });

app.ready((e) => {
  if (e) {
    logger.error("app ready error", { e });
    throw e;
  }

  socketIoBootstrap({ socketIoServer: app.io });
});
