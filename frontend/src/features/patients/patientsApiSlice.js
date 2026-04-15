import { apiSlice } from "../../app/apiSlice";

const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: ({ page=1, limit = 5, search, status }) =>
        `/patients?page=${page}&limit=${limit}&search=${search}&status=${status}`,

      providesTags: ["Patient"],
    }),
  }),
});

export const { useGetPatientQuery } = patientApiSlice;
