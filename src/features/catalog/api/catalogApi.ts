import { baseApi } from "@/app/api/baseApi";
import type { CategoryListResponseDto, ProductListResponseDto } from "./catalog.dto";
import { mapCategoryDtoToCategory, mapProductDtoToProduct } from "./catalog.mapper";
import type { Category, ProductList } from "./catalog.model";

const catalogApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        categoryList: builder.query<Category[], void>({
            query: () => "/products/categories",
            transformResponse: (response: CategoryListResponseDto) => {
                // console.log('list response: ', response);
                return response.map(mapCategoryDtoToCategory)
            },
            providesTags: ["Category"]
        }),
        categoryProducts: builder.query<ProductList, string>({
            query: (slug) => `products/category/${slug}`,
            transformResponse: (response: ProductListResponseDto) => {
                // console.log('products response: ', response);
                return {
                    items: response.products.map(mapProductDtoToProduct),
                    pagination: {
                        total: response.total,
                        limit: response.limit,
                        skip: response.skip
                    }
                }
            },
            providesTags: ["Product"]
        }),
        productList: builder.query<ProductList, void>({
            query: () => 'products',
            transformResponse: (response: ProductListResponseDto) => {
                // console.log('products response: ', response);
                return {
                    items: response.products.map(mapProductDtoToProduct),
                    pagination: {
                        total: response.total,
                        limit: response.limit,
                        skip: response.skip
                    }
                }
            }
        })
    })
})

export const { useCategoryListQuery, useLazyCategoryProductsQuery, useProductListQuery } = catalogApi;