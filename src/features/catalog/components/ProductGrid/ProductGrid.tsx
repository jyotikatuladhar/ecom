import { Pagination } from "antd"
import { ProductCard } from "./ProductCard/ProductCard"
import styles from "./ProductGrid.module.css"
import type { ProductList } from "../../api/catalog.model"
import { EmptyState } from "@/components/EmptyState"

type ProductGridProps = {
    data: ProductList
}

export const ProductGrid = ({ data }: ProductGridProps) => {
    const { items, pagination } = data;

    return <section className={styles.wrapper}>
        {
            items.length
                ? <div>
                    <div className={styles.productGrid}>
                        {items.map(product => <ProductCard product={product} />)}

                    </div>
                    <Pagination total={pagination.total} />
                </div>
                : <EmptyState />
        }


    </section>
}