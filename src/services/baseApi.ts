import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        // prepareHeaders: (headers, { getState }) => {
        //     // example: attach auth token later
        //     // const token = (getState() as RootState).auth.token;
        //     // if (token) headers.set('authorization', `Bearer ${token}`);
        //     return headers;
        // },
    }),
    tagTypes: ['User', 'Product', 'Cart', 'Categories'],
    endpoints: () => ({}), // endpoints injected per feature productApi, userApi
});
