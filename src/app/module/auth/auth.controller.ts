import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerpatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.registerpatient(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient Created Successfully",
    data: result,
  });
});

export const AuthController = {
  registerpatient,
};
