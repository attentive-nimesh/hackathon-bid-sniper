// src/api/auth.ts
import request from "./api";

export type AuthPayload = {
  email: string;
  password: string;
};

export const loginUser = async (payload: AuthPayload) => {
  const response = await request.post("/api/login", {
    username: payload.email,
    password: payload.password,
  });
  return response.data;
};

export const signupUser = async ({ email, password }: AuthPayload) => {
  const response = await request.post("/api/signup", {
    username: email,
    password,
  });
  return response.data;
};
