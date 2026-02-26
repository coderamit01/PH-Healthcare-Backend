import { Prisma } from "../../../generated/prisma/client";

export interface ICreateDoctorSchedulePayload {
  scheduleIds: [];
}
export interface IUpdateDoctorSchedulePayload {
  scheduleIds: {
    shouldDelete: boolean;
    id: string;
  }[];
}

export const doctorScheduleIncludeConfig: Partial<
  Record<
    keyof Prisma.DoctorSchedulesInclude,
    Prisma.DoctorSchedulesInclude[keyof Prisma.DoctorSchedulesInclude]
  >
> = {
  doctor: {
    include: {
      user: true,
      appointments: true,
      specialties: true,
    },
  },
  schedule: true,
};
