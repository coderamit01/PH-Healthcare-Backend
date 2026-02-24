import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(
  async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);

    const payload = {
      ...data,
      icon: req.file?.path
    };
    const result = await SpecialtyService.createSpecialty(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Specialty created Successfully",
      data: result
    })
  })

const getAllSpecialty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SpecialtyService.getAllSpecialty();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive Specialty Successfully",
      data: result
    })
  }
);

const updateSpecialty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await SpecialtyService.updateSpecialty(id as string, payload);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Update Specialty Successfuly",
      data: result
    })
  }
)

const deleteSpecialty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtyService.deleteSpecialty(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Deleted Specialty Successfuly",
      data: result
    })
  }
)


export const SpecialtyController = {
  createSpecialty, getAllSpecialty, updateSpecialty, deleteSpecialty,
}