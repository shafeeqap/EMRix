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
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
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
  useUpdateUserStatusMutation
} = userApiSlice;
