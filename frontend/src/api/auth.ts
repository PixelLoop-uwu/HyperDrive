import { api } from "./client";
import type { LoginParams, AuthResponse } from "@/types/auth";


export const AuthApi = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/login", params);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refresh: async (): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/refresh");
    return data;
  }
};