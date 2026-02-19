import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/v1", IndexRoutes);

//Server start
app.get("/", (req: Request, res: Response) => {
  res.send("Wooo Server is running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
