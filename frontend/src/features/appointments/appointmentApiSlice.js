import { apiSlice } from "../../app/apiSlice";

const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ doctorId, date }) =>
        `/appointments/slots?doctorId=${doctorId}&date=${date}`,

      providesTags: ["Appointment"],
    }),

    searchDoctor: builder.query({
      query: (searchTerm) => ({
        url: "/doctors/search",
        params: { search: searchTerm },
      }),

      transformResponse: (response) => response.doctors,

      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetAvailableSlotsQuery, useSearchDoctorQuery } = appointmentApiSlice;
