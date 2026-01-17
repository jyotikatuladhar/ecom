import { baseApi } from "@/app/api/baseApi";
import type { CategoryListResponseDto, ProductListResponseDto } from "./catalog.dto";
import { mapCategoryDtoToCategory, mapProductDtoToProduct } from "./catalog.mapper";
import type { Category, ProductList } from "./catalog.model";
import type { ProductListArgs } from "../pages/CatalogPage/CatalogPage.types";

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
            query: ({ listType, category, searchParams, pagination }) => {
                const { skip, limit } = pagination;
                searchParams.set('skip', skip.toString());
                searchParams.set('limit', limit.toString());

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
                        return {
                            url: `products`,
                            params: searchParams
                        }
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
        // getPageProducts: builder.infiniteQuery<ProductList, void, number>({
        //     infiniteQueryOptions: {
        //         initialPageParam: 1,
        //         maxPages: 4,
        //         getNextPageParam: (
        //             lastPage,
        //             allPages,
        //             lastPageParam,
        //             allPageParams,
        //             queryArg
        //         ) => { return lastPageParam + 1 },
        //         getPreviousPageParam: (
        //             firstPage,
        //             allPages,
        //             firstPageParam,
        //             allPageParams,
        //             queryArg
        //         ) => {
        //             return firstPageParam > 0 ? firstPageParam - 1 : undefined
        //         }
        //     },
        //     query: ({ queryArg, pageParam }) => {
        //         console.log('queryArg, pageParam: ', queryArg, pageParam);
        //         return `/products?limit=10&skip=${pageParam * 10}`
        //     },
        //     transformResponse: (response: ProductListResponseDto) => {
        //         // console.log('products response: ', response);
        //         return {
        //             items: response.products.map(mapProductDtoToProduct),
        //             pagination: {
        //                 total: response.total,
        //                 limit: response.limit,
        //                 skip: response.skip
        //             }
        //         }
        //     },
        // })

    })
})

export const { useGetCategoriesQuery, useLazyGetProductsQuery,
    // useGetPageProductsInfiniteQuery
} = catalogApi;