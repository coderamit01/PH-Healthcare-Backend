/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { deleteFileFromCloudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {


  if (req.file) {
    await deleteFileFromCloudinary(req.file?.path);
  }

  if((req.files && Array.isArray(req.files)) && req.files.length > 0 ) {
    const imageUrls = req.files.map(file => file.path);
    await Promise.all(imageUrls.map(url => deleteFileFromCloudinary(url)))
  }


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
