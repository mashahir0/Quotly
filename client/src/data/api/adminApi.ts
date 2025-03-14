
import { baseQueryWithAdminReauth } from "../connectionApis/Admin";
import { createApi } from "@reduxjs/toolkit/query/react";


export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery:baseQueryWithAdminReauth,
    tagTypes:['Users'],
    endpoints:(builder) => ({
        adminLogin: builder.mutation<any, { email: string, password: string }>({
        query: (admin) => ({
          url: '/login',
          method: 'POST',
          body: admin,
        }),
      }),
      getUsers: builder.query<any, void>({
        query: () => "/users",
        providesTags:['Users']
      }),
      blockUser:builder.mutation<any , string>({
        query :(id) => ({
            url : '/block-user',
            method: 'POST',
            body : {id}
        }),
        invalidatesTags:['Users']
      }),
     deleteUser:builder.mutation<any ,string>({
        query:(id)=> ({
            url : '/delete-user',
            method : 'DELETE',
            body :{id}
        }),
        invalidatesTags :['Users']
     })
  
    })
  })
  
  export const {
    useAdminLoginMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useDeleteUserMutation
    
  } = adminApi