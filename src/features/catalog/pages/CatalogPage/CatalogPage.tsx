import { Loading } from "@/components/Loading";
import { useLazyGetProductsQuery } from "../../api/catalogApi";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { EmptyState } from "@/components/EmptyState";
import { Button, Dropdown, Menu, type MenuProps } from "antd";
import { SortAscendingOutlined, SortDescendingOutlined, FilterOutlined } from "@ant-design/icons";
import { ArrowBigUp, ArrowUp, ArrowUp01Icon, SortAscIcon, SortDescIcon } from "lucide-react";

type QueryData = { category?: string, searchParams?: URLSearchParams };
type SearchParams = { sortBy: string, order: string };

const CatalogPage = () => {
    let content: React.ReactNode;
    const navigate = useNavigate();
    const { slug: category } = useParams();
    const [searchParams] = useSearchParams();

    const [triggerProductList, productListResult] = useLazyGetProductsQuery();
    const { data, isLoading, isUninitialized, } = productListResult;

    useEffect(() => {
        const queryData = getQueryData({ category, searchParams })
        triggerProductList(queryData);
    }, [category, searchParams])

    const getQueryData = ({ category, searchParams }: QueryData): QueryData => {
        let query = {};
        if (category && searchParams) {
            query = {
                category: category,
                searchParams
            }
        }
        else if (searchParams) {
            query = {
                searchParams
            }
        } else if (category) {
            query = {
                category: category
            }
        }
        // Default is all products listing query 'products'
        return query
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
        } catch (error) {
            console.error(error)
        }
    };

    const items = [
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
            danger: true,
            params: {
                order: 'desc',
                sortBy: 'price'
            }
        },
    ];

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
                    <div className={styles.sortMenu}>
                        {/* Sort dropdown section */}
                        <button className={`btn ${styles.sortBy}`}>Sort By</button>
                        <div className={styles.sortOptions}>
                            {/* items  */}
                            <ul>
                                {items.map(menuItem => <li
                                    onClick={() => handleMenuClick(menuItem.params)} className="w-full px-2 py-3 hover:cursor-pointer hover:shadow-md hover:font-semibold transition-all">
                                    <span className="flex gap-2">{menuItem.icon} {menuItem.label}</span></li>)}
                            </ul>
                        </div>
                    </div>
                    {/* <Dropdown menu={menuProps} trigger={['hover']} >
                        <Button onClick={handleButtonClick} type="primary"
                            icon={<FilterOutlined />} iconPlacement="end"
                        >
                            Sort By
                        </Button>
                    </Dropdown> */}
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