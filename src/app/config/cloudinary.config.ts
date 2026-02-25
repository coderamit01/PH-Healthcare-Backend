/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { envVars } from "./env";
import { AppError } from "../errorhelpers/AppError";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUD_NAME,
  api_key: envVars.CLOUDINARY.API_KEY,
  api_secret: envVars.CLOUDINARY.API_SECRET,
});

export const uploadFileToCloudinary = async (
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName) {
    throw new AppError(
      400,
      "Buffer and file name are required for uploading to Cloudinary",
    );
  }
  const extension = fileName.split(".").pop()?.toLocaleLowerCase();
  // eslint-disable-next-line no-useless-escape
  const fileNameWithOutExtension = fileName
    .split(".")
    .slice(0, -1)
    .join(".")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  const uniqueName =
    Math.random().toString(36).substring(2) +
    "-" +
    Date.now() +
    "-" +
    fileNameWithOutExtension;

  const folder = extension === "pdf" ? "pdfs" : "images";
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: `ph-healthcare/${folder}/${uniqueName}`,
          folder: `ph-healthcare/${folder}`,
        },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(500, "Failed to upload file to Cloudinary"),
            );
          }
          resolve(result as UploadApiResponse);
        },
      )
      .end(buffer);
  });
};

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);
    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id, {
        resource_type: "image",
      });
    }
  } catch (error: any) {
    throw new AppError(500, "Failed to delete file from Cloudinary");
  }
};

export const cloudinaryUpload = cloudinary;
