/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { UserStatus } from "../../../generated/prisma/enums";
import { envVars } from "../../config/env";
import { AppError } from "../../errorhelpers/AppError";
import { IRequestUser } from "../../interface/request.interface";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { tokenUtils } from "../../utils/token";

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

    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    })

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    })
    return {
      ...data,
      accessToken,
      refreshToken,
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

  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  })

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  })
  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

const getMe = async (payload: IRequestUser) => {
  
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    include: {
      patient: true,
      doctor: true,
      admin: true,
    }
  })

  if (!isUserExists) {
    throw new AppError(404, "User not found");
  }

  return isUserExists;
}

const getNewToken = async (refreshToken:string,sessionToken:string) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where:{
      token: sessionToken,
    },
    include: {
      user: true,
    }
  })
  if (!isSessionTokenExists) {
    throw new AppError(401, "Invalid session token");
  }
   const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET);


    if(!verifiedRefreshToken.success && verifiedRefreshToken.error){
        throw new AppError(401, "Invalid refresh token");
    }

    const data = verifiedRefreshToken.data as JwtPayload;

    const newAccessToken = tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const {token} = await prisma.session.update({
        where : {
            token : sessionToken
        },
        data : {
            token : sessionToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
            updatedAt: new Date(),
        }
    })

    return {
        accessToken : newAccessToken,
        refreshToken : newRefreshToken,
        sessionToken : token,
    }
}

export const AuthService = {
  registerpatient, loginUser,getMe,getNewToken,
};
