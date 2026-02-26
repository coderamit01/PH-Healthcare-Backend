import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import { IQueryParams } from "../../interface/query.interface";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ScheduleService.createSchedule(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ScheduleService.getAllSchedules(query as IQueryParams);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedules retrieved successfully",
    data: result,
  });
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.getScheduleById(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule retrieved successfully",
    data: result,
  });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ScheduleService.updateSchedule(id as string, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule updated successfully",
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteSchedule(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
