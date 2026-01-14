import { baseApi } from "@/app/api/baseApi";
import type { CategoryListResponseDto, ProductListResponseDto } from "./catalog.dto";
import { mapCategoryDtoToCategory, mapProductDtoToProduct } from "./catalog.mapper";
import type { Category, ProductList } from "./catalog.model";
import type { PageList } from "@/router";

type ProductListArgs = {
    listType: PageList,
    category?: string,
    searchParams?: URLSearchParams,
    limit?: number,
    skip?: number,
}

const catalogApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/products/categories",
            transformResponse: (response: CategoryListResponseDto) => {
                // console.log('list response: ', response);
                return response.map(mapCategoryDtoToCategory)
            },
            providesTags: ["Category"]
        }),
        getProducts: builder.query<ProductList, ProductListArgs>({
            query: ({ listType, category, searchParams }) => {
                // add cases if other filters are added
                switch (listType) {
                    case "CategoryProducts": {
                        const url = `products/category/${category}`
                        if (searchParams) {
                            return {
                                url,
                                params: searchParams
                            }
                        }
                        else return url;
                    }
                    case "ProductSearch": {
                        return {
                            url: `products/search`,
                            params: searchParams
                        }
                    }
                    case "ProductList": {
                        return 'products'
                    }
                }
            },
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
        searchProducts: builder.query<ProductList, ProductListArgs>({
            query: ({ searchParams }) => {
                return {
                    url: 'products/search',
                    params: searchParams
                }
            },
            transformResponse: (response: ProductListResponseDto) => {
                console.log('response: ', response);
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

export const { useGetCategoriesQuery, useLazyGetProductsQuery, useLazySearchProductsQuery } = catalogApi;