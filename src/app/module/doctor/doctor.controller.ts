import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";

const getAllDoctors = catchAsync(async (req:Request, res:Response) => {
  const result = await DoctorService.getAllDoctors();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctors retrieved successfully",
    data: result
  }); 
})
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DoctorService.getDoctorById(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor retrieved successfully",
    data: result,
  });
})

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await DoctorService.updateDoctor(id as string, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
})


const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DoctorService.deleteDoctor(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
})

export const DoctorController = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}