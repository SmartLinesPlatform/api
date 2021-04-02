import "reflect-metadata";
import "express-async-errors";
import "@config/firebase";
import "./shared/containers";

import chalk from "chalk";
import cors from "cors";
import express from "express";

import { port, env } from "./config/environment";
import GlobalErrorMiddleware from "./shared/middlewares/GlobalErrorMiddleware";
import routes from "./shared/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(GlobalErrorMiddleware);

app.listen(port, () => {
  if (env === "prod") {
    console.log(chalk.green(`Environment: ${env}`));
    console.log(chalk.green(`Port: ${port}`));
  } else {
    console.log(chalk.red(`Environment: ${env}`));
    console.log(chalk.red(`Port: ${port}`));
  }
});
