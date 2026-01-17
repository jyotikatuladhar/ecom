import { Pagination } from "antd"
import { ProductCard } from "./ProductCard/ProductCard"
import styles from "./ProductGrid.module.css"
import type { ProductList } from "../../api/catalog.model"
import { EmptyState } from "@/components/EmptyState"
import { useEffect, useMemo, useState } from "react"
import { useLazyGetProductsQuery } from "../../api/catalogApi"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import type { PageList } from "@/router"
import type { ProductListArgs } from "../../pages/CatalogPage/CatalogPage.types"
import { Loading } from "@/components/Loading"

type ProductGridProps = {
    listType: PageList
}

export const ProductGrid = ({ listType }: ProductGridProps) => {
    let content: React.ReactNode;
    const limit = 10;

    const { slug: category } = useParams();
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const pagination = useMemo(() => {
        return {
            limit,
            skip: (page - 1) * limit
        }
    }, [page]);

    const [triggerProductList, productListResult] = useLazyGetProductsQuery();
    const { data, isLoading, isFetching, isUninitialized, } = productListResult;

    useEffect(() => {
        if (listType)
            triggerProductList(getQueryData())
    }, [listType, pagination, category, searchParams])

    const getQueryData = (): ProductListArgs => {
        switch (listType) {
            case "CategoryProducts": {
                return {
                    listType,
                    category,
                    searchParams,
                    pagination
                }
            }
            case "ProductSearch": {
                return {
                    listType,
                    searchParams,
                    pagination
                }
            }
            case "ProductList": {
                return {
                    listType,
                    searchParams,
                    pagination
                }
            }
            default: {
                return {
                    listType,
                    searchParams,
                    pagination
                }
            }
        }
    }

    if (isUninitialized) {
        content = <EmptyState />
    } else if (isLoading || isFetching) {
        content = <Loading />
    } else if (data) {
        const { items, pagination } = data;
        content = <div>
            <div className={styles.productGrid}>
                {items.map(product => <ProductCard product={product} />)}
            </div>
            <Pagination
                total={pagination.total}
                align="center"
                showSizeChanger={false}
                current={page}
                onChange={page => setPage(page)} pageSize={limit} />
        </div>
    } else {
        content = <EmptyState />
    }

    return <section className={styles.wrapper}>
        {content}
    </section>
}