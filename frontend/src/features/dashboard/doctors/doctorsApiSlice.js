import { apiSlice } from "../../../app/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors",
      providesTags: ["Doctor"],
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApiSlice;
