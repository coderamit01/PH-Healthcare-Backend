/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode: number = err.statusCode ?? 500;
  const message: string = err.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
      error: err,
    });
  }
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
