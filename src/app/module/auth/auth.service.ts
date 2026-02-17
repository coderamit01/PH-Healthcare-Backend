import { auth } from "../../lib/auth";

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
    throw new Error("Failed to register patient");
  }
  return data;
};

export const AuthService = {
  registerpatient,
};
