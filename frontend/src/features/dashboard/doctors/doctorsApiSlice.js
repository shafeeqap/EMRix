import { apiSlice } from "../../../app/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors",
      providesTags: ["Doctor"],
    }),

    createDoctor: builder.mutation({
      query: (doctorData) => ({
        url: "/doctors",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    getDoctorById: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: ["Doctor"],
    }),

    updateDoctor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/doctors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),

    updateDoctorStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/doctors/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorStatusMutation,
  useDeleteDoctorMutation,
} = doctorApiSlice;
