import { ChevronDown, Menu } from "lucide-react"
import styles from "./CategorySelect.module.css"
import { useEffect, useRef, useState } from "react"
import { useCategoryListQuery, useLazyCategoryProductsQuery } from "@/features/catalog/api/catalogApi";

export const CategorySelect = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: categories } = useCategoryListQuery();
    const [triggerCategoryProducts, { data: categoryProducts }] = useLazyCategoryProductsQuery()

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // useEffect(() => {
    //     console.log('categoryProducts: ', categoryProducts);
    // }, [categoryProducts])

    const handleMenuClick = (slug: string) => {
        console.log('slug: ', slug);
        triggerCategoryProducts(slug)
        setOpen(false);
    }

    return <div className={`${styles.dropdown} ${open ? styles.active : ""} `} ref={dropdownRef} >
        <button type="button"
            className={`${styles.link} bg-primary hover:cursor-pointer hover:text-textMuted`}
            aria-haspopup="menu" aria-expanded={open}
            onClick={() => setOpen(prev => !prev)}
        >
            <Menu size={18} className="text-white" />
            <span className="text-white">All Categories</span>
            <ChevronDown
                size={16}
                className={`ml-auto text-white transition-transform ${open ? 'rotate-180' : ''}`}
            />
        </button>
        <ul role="menu" className={styles.dropdownMenu}>
            {
                categories?.map(item => {
                    return <li role="menuitem"
                        onClick={() => handleMenuClick(item.slug)} className="hover:cursor-pointer hover:shadow-md hover:font-bold transition-all" key={item.slug} >
                        {item.categoryName}
                    </li>
                })
            }
        </ul>

    </div >

}