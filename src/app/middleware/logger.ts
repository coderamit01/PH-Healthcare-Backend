import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

// Always create logs folder at project root
const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});

// Show logs in console only during development
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export default logger;
