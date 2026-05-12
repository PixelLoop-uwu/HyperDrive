import { create } from 'zustand';

import { AuthApi } from '@/api/auth';
import type { LoginParams } from '@/types/auth';


type AuthState = {
  user: {
    name: string,
    email: string
  } | null,
  sessionToken: null | string,
  isAuth: boolean,

  login: (credentials: LoginParams) => Promise<unknown>,
  refresh: () => Promise<string | null>,
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  sessionToken: null,
  isAuth: false,

  login: async (credentials) => {
    const data = await AuthApi.login(credentials);
    set({ user: data.user ?? null, sessionToken: data.session_token, isAuth: true });
  },

  refresh: async () => {
    try {
      const data = await AuthApi.refresh();
      set({ user: data.user ?? null, sessionToken: data.session_token, isAuth: true });
      return data.session_token;
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        get().logout();
      }
      return null;
    }
  },

  logout: async () => {
    try {
      await AuthApi.logout();
    } finally {
      set({ user: null, sessionToken: null, isAuth: false });
    }
  }
}));

const isUnauthorizedError = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return false;
  }

  const response = (error as { response?: { status?: number } }).response;
  return response?.status === 401;
};
