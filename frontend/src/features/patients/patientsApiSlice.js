import { apiSlice } from "../../app/apiSlice";

const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: ({ page = 1, limit = 5, search, status }) =>
        `/patients?page=${page}&limit=${limit}&search=${search}&status=${status}`,

      providesTags: ["Patient"],
    }),

    createPatient: builder.mutation({
      query: (patientData) => ({
        url: "/patients",
        method: "POST",
        body: patientData,
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const { useGetPatientQuery, useCreatePatientMutation } = patientApiSlice;
