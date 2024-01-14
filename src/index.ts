import fastify from "fastify";
import { fastifySocketIoPlugin } from "./plugins/fastify-socketio.plugin";

import fastifyElasticsearch from "@fastify/elasticsearch";
import fastifyStatic from "@fastify/static";
import { socketIoBootstrap } from "./bootstrap/socketio.bootstrap";
import { fastifyElasticsearchConfig } from "./config/fastify-elasticsearch.config";
import { fastifyStaticConfig } from "./config/fastify-static.config";
import { logger } from "./logging/logger";

const app = fastify();

app.register(fastifySocketIoPlugin);
app.register(fastifyStatic, fastifyStaticConfig);
app.register(fastifyElasticsearch, fastifyElasticsearchConfig);

app.listen({ host: "0.0.0.0", port: 3000 });

app.ready((e) => {
  if (e) {
    logger.error("app ready error", { e });
    throw e;
  }

  socketIoBootstrap({ socketIoServer: app.io });
});
