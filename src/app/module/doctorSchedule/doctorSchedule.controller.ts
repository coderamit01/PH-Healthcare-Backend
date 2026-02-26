import { IQueryParams } from "../../interface/query.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await DoctorScheduleService.createDoctorSchedule(
    user,
    payload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule created successfully",
    data: result,
  });
});

const getMyDoctorSchedule = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const result = await DoctorScheduleService.getMyDoctorSchedule(
    user,
    query as IQueryParams,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule retrieved successfully",
    data: result,
  });
});

const getAllDoctorSchedules = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await DoctorScheduleService.getAllDoctorSchedules(
    query as IQueryParams,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All doctor schedules retrieved successfully",
    data: result,
  });
});

const getDoctorScheduleById = catchAsync(async (req, res) => {
  const { doctorId, scheduleId } = req.params;
  const result = await DoctorScheduleService.getDoctorScheduleById(
    doctorId as string,
    scheduleId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule retrieved successfully",
    data: result,
  });
});

const updateMyDoctorSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const payload = req.body;
  const result = await DoctorScheduleService.updateMyDoctorSchedule(
    id as string,
    user,
    payload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule updated successfully",
    data: result,
  });
});

const deleteMyDoctorSchedule = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await DoctorScheduleService.deleteMyDoctorSchedule(id as string, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor schedule deleted successfully",
  });
});

export const DoctorScheduleController = {
  createDoctorSchedule,
  getMyDoctorSchedule,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
};
