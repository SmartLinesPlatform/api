import express from "express";

import { port, env } from "./config/environment";

const app = express();

app.listen(port, () => {
  console.log(`Environment: ${env}`);
  console.log(`Port: ${port}`);
});
