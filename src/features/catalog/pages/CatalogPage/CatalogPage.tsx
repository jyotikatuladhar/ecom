import { Loading } from "@/components/Loading";
import { useLazyGetProductsQuery } from "../../api/catalogApi";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { EmptyState } from "@/components/EmptyState";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import type { MenuItem, QueryData, SearchParams } from "./CatalogPage.types";
import type { PageList } from "@/router";

type CatalogProps = {
    listType: PageList
}

const CatalogPage = ({ listType }: CatalogProps) => {
    let content: React.ReactNode;
    const navigate = useNavigate();
    const { slug: category } = useParams();
    const [searchParams] = useSearchParams();

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [triggerProductList, productListResult] = useLazyGetProductsQuery();
    const { data, isLoading, isUninitialized, } = productListResult;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current?.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    useEffect(() => {
        if (listType)
            triggerProductList(getQueryData())
    }, [listType])

    const getQueryData = (): QueryData => {
        switch (listType) {
            case "CategoryProducts": {
                return {
                    listType,
                    category,
                    searchParams
                }
            }
            case "ProductSearch": {
                return {
                    listType,
                    searchParams
                }
            }
            case "ProductList": {
                return {
                    listType,
                    searchParams
                }
            }
            default: {
                return {
                    listType
                }
            }
        }
    }

    if (isUninitialized) {
        content = <EmptyState />
    } else if (isLoading) {
        content = <Loading />
    } else if (data) {
        content = <ProductGrid data={data} />
    } else {
        content = <EmptyState />
    }


    const handleMenuClick = (params: SearchParams) => {
        try {
            const searchParams: URLSearchParams = new URLSearchParams();
            Object.entries(params)?.map(([name, value]) => searchParams.set(name, value))
            navigate(`?${searchParams.toString()}`)
            setDropdownOpen(false)
        } catch (error) {
            console.error(error)
        }
    };

    const items: MenuItem[] = [
        {
            label: 'Price: Low To High',
            key: '1',
            icon: <SortAscIcon />,
            params: {
                order: 'asc',
                sortBy: 'price'
            }
        },
        {
            label: 'Price: High To Low',
            key: '4',
            icon: <SortDescIcon />,
            params: {
                order: 'desc',
                sortBy: 'price'
            }
        },
    ];

    const SortSection = () => {
        return <>
            <button onClick={() => setDropdownOpen(prev => !prev)}
                className={`btn ${styles.sortBy} `}>Sort By</button>
            {/* items  */}
            <ul className={styles.sortOptions} role="menu">
                {items.map(menuItem => <li
                    onClick={() => handleMenuClick(menuItem.params)} className="w-full px-2 py-3 transition-all">
                    <span className="flex gap-2">{menuItem.icon} {menuItem.label}</span></li>)}
            </ul >
        </>
    }

    return <>
        <section >
            <SearchBar />
            {/* Catalog Page */}
            <div className={styles.catalogLayout}>
                {/* Filters Section  */}
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>
                        {category?.replace("-", " ")}
                    </h1>
                    <div className={`${styles.sortMenu} ${dropdownOpen ? styles.active : ""}`} ref={dropdownRef}>
                        {/* Sort dropdown section */}
                        <SortSection />
                    </div>
                </div>
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