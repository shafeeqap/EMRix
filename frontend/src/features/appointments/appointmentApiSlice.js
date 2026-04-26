import { apiSlice } from "../../app/apiSlice";

const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ doctorId, date }) =>
        `/appointments/slots?doctorId=${doctorId}&date=${date}`,

      providesTags: ["Appointment"],
    }),

    getAppointments: builder.query({
      query: ({ doctorId, date }) =>
        `appointments?doctorId=${doctorId}&date=${date}`,

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
  useCreateAppointmentMutation,
} = appointmentApiSlice;
