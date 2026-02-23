import dotenv from 'dotenv'

dotenv.config();

interface EnvConfig {
  PORT: string
  DATABASE_URL: string
  FRONTEND_URL: string,
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  NODE_ENV: string
  ACCESS_TOKEN_SECRET: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  JWT_REFRESH_SECRET: string
  JWT_REFRESH_EXPIRES_IN: string,
  EMAIL_SENDER: {
    SMTP_FROM: string,
    SMTP_HOST: string,
    SMTP_PORT: string,
    SMTP_USER: string,
    SMTP_PASS: string
  }
}

const envVariables = (): EnvConfig => {
  const requiredEnvVariales = [
    'PORT',
    'DATABASE_URL',
    'FRONTEND_URL',
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'NODE_ENV',
    'ACCESS_TOKEN_SECRET',
    'ACCESS_TOKEN_EXPIRES_IN',
    'REFRESH_TOKEN_EXPIRES_IN',
    'JWT_REFRESH_SECRET',
    'JWT_REFRESH_EXPIRES_IN',
    'EMAIL_SENDER_SMTP_HOST',
    'EMAIL_SENDER_SMTP_PORT',
    'EMAIL_SENDER_SMTP_USER',
    'EMAIL_SENDER_SMTP_PASS',
    'EMAIL_SENDER_SMTP_FROM'

  ]

  requiredEnvVariales.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Environment variable ${variable} is required but not defined in .env file.`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    EMAIL_SENDER: {
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST as string,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT as string,
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER as string,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS as string,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM as string,
    }

  }
}

export const envVars = envVariables();