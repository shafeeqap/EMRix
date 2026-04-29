import { apiSlice } from "../../app/apiSlice";

const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ doctorId, date }) =>
        `/appointments/slots?doctorId=${doctorId}&date=${date}`,

      providesTags: ["Appointment"],
    }),

    getAppointments: builder.query({
      query: ({ page = 1, limit = 5, search, status }) =>
        `/appointments?page=${page}&limit=${limit}&search=${search}&status=${status}`,

      providesTags: ["Appointment"],
    }),

    getAppointmentById: builder.query({
      query: ({ id }) => `/appointments/${id}`,

      providesTags: ["Appointment"],
    }),

    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
} = appointmentApiSlice;
