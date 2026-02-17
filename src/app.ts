import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.use("/api/v1", IndexRoutes);

//Server start
app.get("/", (req: Request, res: Response) => {
  res.send("Wooo Server is running!");
});

export default app;
