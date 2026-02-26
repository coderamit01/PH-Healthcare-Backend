/* eslint-disable @typescript-eslint/no-unused-vars */
import { addHours, addMinutes, format } from "date-fns";
import {
  IScheduleCreatePayload,
  IScheduleUpdatePayload,
} from "./schedule.interface";
import { convertDateTime } from "./schedule.utils";
import { prisma } from "../../lib/prisma";
import { IQueryParams } from "../../interface/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Prisma, Schedule } from "../../../generated/prisma/client";
import {
  scheduleFilterableFileds,
  scheduleIncludeConfig,
  scheduleSearchableFileds,
} from "./schedule.constant";

const createSchedule = async (payload: IScheduleCreatePayload) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interval = 30;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  const schedules = [];

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]),
        ),
        Number(startTime.split(":")[1]),
      ),
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(lastDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );

    while (startDateTime < endDateTime) {
      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, interval));

      const scheduleData = {
        startDateTime: s,
        endDateTime: e,
      };

      const existsSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existsSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });

        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + interval);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};

const getAllSchedules = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Schedule,
    Prisma.ScheduleWhereInput,
    Prisma.ScheduleInclude
  >(prisma.schedule, query, {
    searchableFields: scheduleSearchableFileds,
    filterableFields: scheduleFilterableFileds,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    .dynamicInclude(scheduleIncludeConfig)
    .sort()
    .fields()
    .execute();

  return result;
};

const getScheduleById = async (id: string) => {
  const result = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSchedule = async (id: string, payload: IScheduleUpdatePayload) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const startDateTime = new Date(
    addMinutes(
      addHours(
        `${format(new Date(startDate), "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0]),
      ),
      Number(startTime.split(":")[1]),
    ),
  );

  const endDateTime = new Date(
    addMinutes(
      addHours(
        `${format(new Date(endDate), "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0]),
      ),
      Number(endTime.split(":")[1]),
    ),
  );

  const result = await prisma.schedule.update({
    where: { id },
    data: {
      startDateTime,
      endDateTime,
    },
  });
  return result;
};

const deleteSchedule = async (id: string) => {
  const result = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return true;
};

export const ScheduleService = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
