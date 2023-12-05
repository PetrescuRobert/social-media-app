import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCredentials } from './types';

export const authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/auth/',
  }),
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<User, UserCredentials>({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: { accessToken: string; message: string };
      }) => response.data.message,
    }),
  }),
});

export const { useAuthenticateUserMutation } = authentication;
