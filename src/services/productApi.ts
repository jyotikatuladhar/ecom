import type { Product } from "@/types/domain/product";
import { baseApi } from "./baseApi";
import type { ApiResponse } from "./api.types";

const productApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        productsList: builder.query({
            query: () => '/products',
            transformResponse: (response: ApiResponse<Product>) => {
                console.log('transform response: ', response);
                return response
            },
            providesTags: ['Product']
        }),
        productDetail: builder.query({
            query: (id) => `/products/${id}`,
            transformResponse: (response: ApiResponse<Product>) => {
                console.log('trandform details response: ', response);
                return response

            }
        })
    })
})

export const { useProductsListQuery, useProductDetailQuery, useLazyProductDetailQuery } = productApi;