import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/register",
        method: "post",
        data: {
          email,
          password,
        },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        method: "post",
        url: "auth/login",
        data: { email, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        method: "post",
        url: "auth/logout",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authSlice;
