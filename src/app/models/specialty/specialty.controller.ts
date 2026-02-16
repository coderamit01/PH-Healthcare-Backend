import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await SpecialtyService.createSpecialty(payload);

    res.status(201).json({
      success: true,
      message: "Specialty created Successfully",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({
      success: true,
      message: "Failed to created Specialty",
      error: error.message
    })
  }
}

const getAllSpecialty = async (req: Request, res: Response) => {
  try {
    const result = await SpecialtyService.getAllSpecialty();

    res.status(200).json({
      success: true,
      message: "Retrive Specialty Successfully",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({
      success: true,
      message: "Failed to Retrive Specialty",
      error: error.message
    })
  }
}
const updateSpecialty = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const payload = req.body;
    const result = await SpecialtyService.updateSpecialty(id as string,payload);

    res.status(200).json({
      success: true,
      message: "Update Specialty Successfuly",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({
      success: true,
      message: "Failed to update Specialty",
      error: error.message
    })
  }
}
const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const result = await SpecialtyService.deleteSpecialty(id as string);

    res.status(200).json({
      success: true,
      message: "Deleted Specialty Successfuly",
      data: result
    })
  } catch (error:any) {
    res.status(500).json({
      success: true,
      message: "Failed to Delete Specialty",
      error: error.message
    })
  }
}


export const SpecialtyController = {
  createSpecialty,getAllSpecialty,updateSpecialty,deleteSpecialty,
}