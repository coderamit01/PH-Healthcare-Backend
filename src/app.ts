/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import cors from "cors";
// import cron from "node-cron";
import { envVars } from "./app/config/env";
// import { AppointmentService } from "./app/module/appoinment/appoinment.service";
import { PaymentController } from "./app/module/payment/payment.controller";
import logger from "./app/middleware/logger";

const app: Application = express();

app.post("/webhook", express.raw({ type: "application/json" }), PaymentController.handleStripeWebhookEvent)

app.use(cors({
  origin: [envVars.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/api/auth', toNodeHandler(auth));

app.use(express.urlencoded({ extended: true }));

// cron.schedule("*/25 * * * *", async () => {
//     try {
//         console.log("Running cron job to cancel unpaid appointments...");
//         await AppointmentService.cancelUnpaidAppointments();
//     } catch (error : any) {
//         console.error("Error occurred while canceling unpaid appointments:", error.message);    
//     }
// })

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", IndexRoutes);

// Middleware to log every request
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack, url: req.url });
  res.status(500).json({ error: "Internal Server Error" });
});

//Server start
app.get("/", (req: Request, res: Response) => {
  res.send("Wooo Server is running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
