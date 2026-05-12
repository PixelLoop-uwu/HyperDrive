export type AuthResponse = {
  user?: {
    email: string;
    name: string;
  };
  session_token: string;
};

export interface LoginParams {
  login_identifier: string;
  password: string;
}