export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
  accessToken: string;
}

export type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  accessToken: string | null;
};
