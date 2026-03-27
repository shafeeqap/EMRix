import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(import.meta.env.VITE_API_URL, 'vite api url');

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Appointment", "Doctor", "Patient"],
  endpoints: (builder) => ({}),
});
