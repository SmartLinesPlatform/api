import cors from "cors";
import express from "express";

import { port, env } from "./config/environment";
import routes from "./shared/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Environment: ${env}`);
  console.log(`Port: ${port}`);
});
