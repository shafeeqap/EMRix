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
    }),

    getDoctorById: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: ["Doctor"],
    }),

    updateDoctor: builder.mutation({
      query: ({ id, doctorData }) => ({
        url: `/doctors/${id}`,
        method: "PUT",
        body: doctorData,
        invalidatesTags: ["Doctor"],
      }),
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
        invalidatesTags: ["Doctor"],
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApiSlice;
