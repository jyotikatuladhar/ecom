
import { Button } from "antd"
import styles from "./ProductCard.module.css"
import { HeartIcon, Share2Icon, ShareIcon, ShoppingCartIcon } from "lucide-react"
import type { Product } from "@/features/catalog/api/catalog.model"
// { product }: { product: Product }

export const ProductCard = () => {
    return <div className={styles.wrapper}>
        {/* Image and Actions Section */}
        <div className={styles.imageWrapper}>
            {/* Image Section */}
            <div>
                <img src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" alt="" />
            </div>
            <div className={styles.discount}>
                -20%
            </div>

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
            <div className="text-textMuted">Category</div>
            {/* Name */}
            <div className="text-lg font-bold">
                Name
            </div>
            {/* price */}
            <div>
                $0
            </div>
        </div>
    </div>
}