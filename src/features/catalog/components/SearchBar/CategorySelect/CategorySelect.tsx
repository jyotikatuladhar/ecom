import { ChevronDown, Menu } from "lucide-react"
import styles from "./CategorySelect.module.css"
import { useEffect, useRef, useState } from "react"
import { useGetCategoriesQuery } from "@/features/catalog/api/catalogApi";
import { Link } from "react-router-dom";
import type { Category } from "@/features/catalog/api/catalog.model";

export const CategorySelect = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: categories } = useGetCategoriesQuery();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleMenuClick = () => {
        setOpen(false);
    }

    const ListItem = ({ category }: { category: Category }) => (<li role="menuitem" key={category.slug}
        onClick={handleMenuClick} >
        <Link
            to={`/category/${category.slug}`}
            className="w-full block px-4 py-3 hover:cursor-pointer hover:shadow-md hover:font-bold transition-all">
            {category.categoryName}
        </Link>
    </li>)

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
                categories?.map(category => <ListItem category={category} />)
            }
        </ul>
    </div >
}