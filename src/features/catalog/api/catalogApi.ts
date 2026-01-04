import { baseApi } from "@/app/api/baseApi";
import type { CategoryListResponseDto, ProductListResponseDto } from "./catalog.dto";
import { mapCategoryDtoToCategory } from "./catalog.mapper";

const catalogApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        categoryList: builder.query({
            query: () => "/products/categories",
            transformResponse: (response: CategoryListResponseDto) => {
                console.log('list response: ', response);
                return response.map(mapCategoryDtoToCategory)
            },
            providesTags: ["Category"]
        }),
        categoryProducts: builder.query({
            query: (slug) => `products/category/${slug}`,
            transformResponse: (response: ProductListResponseDto) => {
                console.log('products response: ', response);
                return response;
            },
            providesTags: ["Product"]
        })
    })
})

export const { useCategoryListQuery, useLazyCategoryProductsQuery } = catalogApi;