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

    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSearchUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApiSlice;
