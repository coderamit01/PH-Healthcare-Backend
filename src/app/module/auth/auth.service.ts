/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserStatus } from "../../../generated/prisma/enums";
import { AppError } from "../../errorhelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerpatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    throw new AppError(400, "Failed to register patient");
  }

  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name,
          email,
        }
      })
      return patientTx;
    })

    return {
      ...data,
      patient
    }
  } catch (error: any) {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      }
    })

    throw new AppError(500, error.message || "Failed to create patient profile");
  }
};

const loginUser = async (payload: IRegisterPatientPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is deleted");
  }
  return data;
};

export const AuthService = {
  registerpatient, loginUser
};
