export interface IBookAppointmentPayload {
  scheduleId: string;
  doctorId: string;
}
export interface IUpdateAppointmentPayload {
  doctorId?: string;
  scheduleId?: string;
  status?: string;
}
