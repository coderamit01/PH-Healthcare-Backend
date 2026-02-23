/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { envVars } from '../config/env';
import { AppError } from '../errorhelpers/AppError';
import path from 'path';
import ejs from 'ejs';



const transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  port: parseInt(envVars.EMAIL_SENDER.SMTP_PORT),
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS,
  },
});

interface sendEmailOptions {
  to: string;
  subject: string;
  templateData: Record<string, any>;
  templateName: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;

  }[];
}


export const sendEmail = async ({ to, subject,templateName, templateData, attachments }: sendEmailOptions) => {
  try {
    const templatePath = path.resolve(process.cwd(), `src/app/templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => {
        return {
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        }
      })
    });
  } catch (error: any) {
    throw new AppError(500, "Failed to send email", error.message);
  }
}