import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmin();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const getAdminById = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params;

  const result = await AdminService.getAdminById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})
const updateAdmin = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params;
  const payload = req.body
  const result = await AdminService.updateAdmin(id as string, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params;
  const user = req.user;
  const result = await AdminService.deleteAdmin(id as string, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})


export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin
}