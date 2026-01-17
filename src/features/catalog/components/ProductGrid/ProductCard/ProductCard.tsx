
import { Button } from "antd"
import styles from "./ProductCard.module.css"
import { HeartIcon, Share2Icon, ShareIcon, ShoppingCartIcon } from "lucide-react"
import type { Product } from "@/features/catalog/api/catalog.model"
import { Link } from "react-router-dom"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // console.log('product: ', product);

    return <div className={styles.wrapper}>
        {/* Image and Actions Section */}
        <div className={styles.imageWrapper}>
            {/* Image Section */}
            <div className={styles.image}>
                <Link to={`/products/${product.id}`}
                    aria-label={`Detail Page of ${product.productName}`}
                >
                    <img src={product.image} alt={`Image of ${product.productName}`} />
                </Link>
            </div>
            {
                product.discountPercent
                    ? <div className={styles.discount}>
                        -{product.discountPercent}%
                    </div>
                    : null
            }

            {/* Animated Buttons Section */}
            <div className={styles.actionButtons}>
                <div className={styles.buttons}>
                    <Button shape="circle" ><HeartIcon size={18} /></Button>
                    <Button shape="circle"><Share2Icon size={18} /></Button>
                    <Button shape="circle"><ShoppingCartIcon size={18} /></Button>
                </div>
            </div>
        </div>


        {/* Product Detail Section */}
        <div className={styles.productDetail}>
            {/* Category */}
            <div className={`text-textMuted ${styles.category}`}>{product.category}</div>
            {/* Name */}
            <div className="font-bold">
                <Link to={`/products/${product.id}`}
                    aria-label={`Detail Page of ${product.productName}`}
                >
                    {product.productName}
                </Link>
            </div>
            {/* price */}
            <div>
                <span className={styles.price}>${product.price}</span>
                {
                    product.discountPercent
                        ? <span className={`${styles.originalPrice} text-textMuted`}>${product.originalPrice}</span>
                        : null
                }
            </div>
        </div>
    </div>
}