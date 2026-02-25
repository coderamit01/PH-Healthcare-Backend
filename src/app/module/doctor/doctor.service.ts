import { Doctor, Prisma } from "../../../generated/prisma/client";
import { UserStatus } from "../../../generated/prisma/enums";
import { AppError } from "../../errorhelpers/AppError";
import { IQueryParams } from "../../interface/query.interface";
import { prisma } from "../../lib/prisma"
import { QueryBuilder } from "../../utils/QueryBuilder";
import { doctorFilterableFields, doctorIncludeConfig, doctorSearchableFields } from "./doctor.constant";
import { IDoctorUpdatePayload } from "./doctor.interface";


const getAllDoctors = async (query: IQueryParams) => {
  // const doctors = await prisma.doctor.findMany({
  //   include: {
  //     user: true,
  //     specialties: {
  //       include: { specialty: true }
  //     }
  //   }
  // })
  // return doctors;
  const queryBuilder = new QueryBuilder<Doctor, Prisma.DoctorWhereInput, Prisma.DoctorInclude>(
    prisma.doctor,
    query,
    {
      searchableFields: doctorSearchableFields,
      filterableFields: doctorFilterableFields,
    }
  )

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      isDeleted: false
    })
    .include({
      user: true,
      specialties: {
        include: {
          specialty: true
        }
      }
    })
    .dynamicInclude(doctorIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  return result;
}


const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      specialties: {
        include: { specialty: true }
      },
    }
  })
  return doctor;
}

const updateDoctor = async (id: string, payload: IDoctorUpdatePayload) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id,
    }
  })
  if (!isDoctorExist) {
    throw new AppError(404, "Doctor not found");
  }
  const { doctor: doctorData, specialties } = payload;

  await prisma.$transaction(async (tx) => {

    if (doctorData) {
      await tx.doctor.update({
        where: {
          id
        },
        data: {
          ...doctorData
        }
      })
    }

    if (specialties && specialties.length > 0) {
      for (const specialty of specialties) {
        const { specialtyId, shouldDelete } = specialty;
        if (shouldDelete) {
          await tx.doctorSpecialty.delete({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              }
            }
          })
        } else {
          await tx.doctorSpecialty.upsert({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              }
            },
            create: {
              doctorId: id,
              specialtyId,
            },
            update: {}
          })
        }
      }
    }
  })
  const doctor = await getDoctorById(id);

  return doctor;
}

const deleteDoctor = async (id: string) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id,
    }
  })
  if (!isDoctorExist) {
    throw new AppError(404, "Doctor not found");
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })
    await tx.user.update({
      where: {
        id: isDoctorExist.userId
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: UserStatus.DELETED
      }
    })

    await tx.session.deleteMany({
      where: {
        userId: isDoctorExist.userId
      }
    })

    await tx.doctorSpecialty.deleteMany({
      where: {
        doctorId: isDoctorExist.id
      }
    })
  })
}


export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
}