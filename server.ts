import express from "express";
import type { Application } from "express";
import Server from "./src/index.js";

const app: Application = express();
new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: unknown) => {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code?: unknown }).code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });