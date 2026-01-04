import { Pagination } from "antd"
import { ProductCard } from "./ProductCard/ProductCard"
import styles from "./ProductGrid.module.css"

export const ProductGrid = () => {
    return <section className={styles.wrapper}>
        <div className={styles.productGrid}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />

        </div>
        <Pagination />

    </section>
}