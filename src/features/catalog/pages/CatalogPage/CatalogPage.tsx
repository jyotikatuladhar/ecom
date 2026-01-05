import { Loading } from "@/components/Loading";
import { useLazyGetProductsQuery } from "../../api/catalogApi";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { EmptyState } from "@/components/EmptyState";

const CatalogPage = () => {
    let content: React.ReactNode;

    const { slug } = useParams();

    const [triggerProductList, productListResult] = useLazyGetProductsQuery();
    const { data, isLoading, isUninitialized, } = productListResult;


    useEffect(() => {
        if (slug) {
            triggerProductList({ category: slug });
        } else {
            triggerProductList({});
        }
    }, [slug])

    if (isUninitialized) {
        content = <EmptyState />
    } else if (isLoading) {
        content = <Loading />
    } else if (data) {
        content = <ProductGrid data={data} />
    } else {
        content = <EmptyState />
    }

    return <>
        <section >
            <SearchBar />
            {/* Catalog Page */}
            <h1 className=" font-semibold capitalize text-2xl mt-4 pb-3 border-b-primary ">
                {slug?.replace("-", " ")}
            </h1>
            <div className={styles.catalogLayout}>
                {/* Filters Section  */}
                <aside className={styles.filters}>
                    Filters
                </aside>
                <main className={styles.products}>
                    {content}
                </main>
            </div>
        </section>
    </>
}

export default CatalogPage;