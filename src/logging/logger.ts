import winston from "winston";
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from "winston-elasticsearch";
import { fastifyElasticsearchConfig } from "../config/fastify-elasticsearch.config";

const esTransportOpts: ElasticsearchTransportOptions = {
  level: "info",
  clientOpts: {
    node: fastifyElasticsearchConfig.node,
  },
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    esTransport,
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
