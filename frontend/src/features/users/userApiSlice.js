import { apiSlice } from "../../app/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ page = 1, limit = 5, search, status }) =>
        `/users?page=${page}&limit=${limit}&search=${search}&status=${status}`,

      providesTags: ["User"],
    }),

    searchUsers: builder.query({
      query: (searchTerm) => ({
        url: "/users/search",
        params: { search: searchTerm },
      }),

      transformResponse: (response) => response.users,

      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetUserQuery, useSearchUsersQuery } = userApiSlice;
