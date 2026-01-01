import { baseApi } from './baseApi';

// export const userApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         // <User, void>
//         getUser: builder.query({
//             query: () => '/user/me',
//             providesTags: ['User'],
//         }),
//     }),
// });
const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        userList: builder.query({
            query: () => "user/me",
            providesTags: ["User"]
        })
    })
})

export const { useUserListQuery } = userApi;
