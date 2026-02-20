/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role, Specialty } from "../../../generated/prisma/client";
import { AppError } from "../../errorhelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IDoctorCreatePayload } from "./user.interface"

const createDoctor = async (payload: IDoctorCreatePayload) => {
  const specialties: Specialty[] = [];

  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId
      }
    });

    if (!specialty) {
      throw new AppError(404, `Specialty with ID ${specialtyId} not found`);
    }

    specialties.push(specialty);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email
    }
  })
  if (userExists) {
    throw new AppError(409, "User with this email already exists");
  }
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      name: payload.doctor.name,
      role: Role.DOCTOR,
      needPasswordChange: true
    }
  })

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor
        }
      })

      const doctorSpecialtiesData = specialties.map((specialty) => {
        return {
          doctorId: doctorData.id,
          specialtyId: specialty.id
        }
      });

      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtiesData
      })

      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id
        },
        include: {
          user: true,
          specialties: {
            include: {
              specialty: true
            }
          }
        }
      })
      return doctor;
    })
    return result;
  } catch (error: any) {
    await prisma.user.delete({
      where: {
        id: userData.user.id
      }
    })
    throw error;
  }
}

export const UserService = {
  createDoctor
}