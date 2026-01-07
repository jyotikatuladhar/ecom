import { Loading } from "@/components/Loading";
import { useLazyGetProductsQuery } from "../../api/catalogApi";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { EmptyState } from "@/components/EmptyState";
import { Button, Dropdown, Menu, type MenuProps } from "antd";
import { SortAscendingOutlined, SortDescendingOutlined, FilterOutlined } from "@ant-design/icons";

type QueryData = { category?: string, searchParams?: URLSearchParams };

const CatalogPage = () => {
    let content: React.ReactNode;

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


    const handleMenuClick: MenuProps['onClick'] = (e) => {
        // message.info('Click on menu item.');
        console.log('click', e);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // message.info('Click o  n left button.');
        console.log('click left button', e);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Price: Low To High',
            key: '1',
            icon: <SortAscendingOutlined />,
        },
        {
            label: 'Price: High To Low',
            key: '4',
            icon: <SortDescendingOutlined />,
            danger: true,
            // disabled: true,
        },
    ];

    const menuProps: MenuProps = {
        items,
        theme: 'light',
        onClick: handleMenuClick,
    };

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
                    <Dropdown menu={menuProps} trigger={['hover']} >
                        <Button onClick={handleButtonClick} type="primary"
                            icon={<FilterOutlined />} iconPlacement="end"
                        >
                            Sort By
                        </Button>
                    </Dropdown>
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