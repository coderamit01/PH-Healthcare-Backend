import { Role } from "../../generated/prisma/enums.js"
import { envVars } from "../config/env.js"
import { AppError } from "../errorhelpers/AppError.js"
import { auth } from "../lib/auth.js"
import { prisma } from "../lib/prisma.js"

export const seeSuperdAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN
      }
    })
    if (isSuperAdminExist) {
      throw new AppError(400, "Super Admin already exists");
    }

    const superAdminUser = await auth.api.signUpEmail({
      body: {
        email: envVars.SUPER_ADMIN_EMAIL!,
        password: envVars.SUPER_ADMIN_PASSWORD!,
        role: Role.SUPER_ADMIN,
        name: "Super Admin",
        needPasswordChange: false
      }
    })

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: superAdminUser.user.id
        },
        data: {
          emailVerified: true
        }
      })

      await tx.admin.create({
        data: {
          userId: superAdminUser.user.id,
          name: superAdminUser.user.name,
          email: superAdminUser.user.email
        }
      })
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const superAdmin = await prisma.admin.findFirst({
      where: {
        id: envVars.SUPER_ADMIN_EMAIL
      },
      include: {
        user: true
      }
    })
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        email: envVars.SUPER_ADMIN_EMAIL
      }
    })
  }
}

seeSuperdAdmin();