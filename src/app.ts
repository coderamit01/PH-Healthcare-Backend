import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import cors from "cors";
import { envVars } from "./app/config/env";

const app: Application = express();

app.use(cors({
  origin: [envVars.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/api/auth', toNodeHandler(auth));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", IndexRoutes);

//Server start
app.get("/", (req: Request, res: Response) => {
  res.send("Wooo Server is running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
