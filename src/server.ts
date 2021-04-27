import "reflect-metadata";
import "express-async-errors";
import "@config/firebase";
import "./shared/containers";

import chalk from "chalk";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";

import { env, host } from "./config/environment";
import uploadConfig from "./config/upload";
import GlobalErrorMiddleware from "./shared/middlewares/GlobalErrorMiddleware";
import routes from "./shared/routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/files", express.static(uploadConfig.directory));
app.use(routes);
app.use(GlobalErrorMiddleware);

app.listen(3000, () => {
  if (env === "prod") {
    console.log(chalk.green(`Environment: ${env}`));
    console.log(chalk.green(`URL: ${host}`));
  } else {
    console.log(chalk.red(`Environment: ${env}`));
    console.log(chalk.red(`URL: ${host}`));
  }
});
