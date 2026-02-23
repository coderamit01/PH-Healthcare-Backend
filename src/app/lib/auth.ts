import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { bearer, emailOTP } from "better-auth/plugins";
import { sendEmail } from "../utils/email";
import { envVars } from "../config/env";
export const auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.PATIENT,
        required: true,
      },
      status: {
        type: "string",
        defaultValue: UserStatus.ACTIVE,
        required: true,
      },
      needPasswordChange: {
        type: "boolean",
        defaultValue: false,
        required: true,
      },
      isDeleted: {
        type: "boolean",
        defaultValue: false,
        required: true,
      },
      deletedAt: {
        type: "date",
        defaultValue: null,
        required: false,
      },
    },
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, reset, type }) {
        try {
          if (type === "email-verification") {
            const user = await prisma.user.findUnique({
              where: {
                email
              }
            })
            if (user && !user.emailVerified) {
              sendEmail({
                to: email,
                subject: "Verify Your Email",
                templateName: "otp",
                templateData: {
                  name: user.name,
                  otp
                }
              })
            }
          } else if (type === "forget-password") {
            const user = await prisma.user.findUnique({
              where: {
                email
              }
            })
            if (user) {
              sendEmail({
                to: email,
                subject: "Reset your password",
                templateName: "reset-password",
                templateData: {
                  name: user.name,
                  otp
                }
              })
            }
          }

        } catch (error) {
          console.log(error);
        }
      },
      expiresIn: 2 * 60, // 2 minutes
      otpLength: 6,
    })
  ],
  session: {
    expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
    }
  },
   trustedOrigins: [envVars.BETTER_AUTH_URL || "http://localhost:5000", envVars.FRONTEND_URL],
});
