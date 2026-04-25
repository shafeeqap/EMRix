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
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useGetAppointmentsQuery,
} = appointmentApiSlice;
