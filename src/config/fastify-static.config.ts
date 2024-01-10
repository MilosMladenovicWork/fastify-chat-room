import path from "path";

export const fastifyStaticConfig = {
  root: path.join(__dirname, "..", "static"),
  prefix: "/static/",
};
