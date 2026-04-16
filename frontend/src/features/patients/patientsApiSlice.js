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

    updatePatient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/patients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),

    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useUpdatePatientMutation,
} = patientApiSlice;
