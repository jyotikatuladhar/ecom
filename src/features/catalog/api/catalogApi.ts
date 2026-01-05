import { baseApi } from "@/app/api/baseApi";
import type { CategoryListResponseDto, ProductListResponseDto } from "./catalog.dto";
import { mapCategoryDtoToCategory, mapProductDtoToProduct } from "./catalog.mapper";
import type { Category, ProductList } from "./catalog.model";

type ProductListArgs = {
    category?: string,
    limit?: number,
    skip?: number,
    search?: string
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
            query: ({ category }) => {
                if (category) return `products/category/${category}`;
                else return 'products'
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
        })
    })
})

export const { useGetCategoriesQuery, useLazyGetProductsQuery, } = catalogApi;