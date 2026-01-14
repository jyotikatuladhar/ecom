import { Input } from "antd"
import styles from "./SearchInput.module.css"
import { useEffect, useRef, useState, } from "react"
import type { ChangeEventHandler, ChangeEvent, KeyboardEventHandler, SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectInput, setSearchInput } from "./searchSlice";
import { useLazyGetProductsQuery, useLazySearchProductsQuery } from "@/features/catalog/api/catalogApi";
import { Loading } from "@/components/Loading";
import { EmptyState } from "@/components/EmptyState";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/features/catalog/api/catalog.model";

export const SearchInput = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number>(null)

    const dispatch = useAppDispatch();

    const [triggerGetProducts, { data: searchResults, isUninitialized, isLoading, reset }] = useLazyGetProductsQuery();


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        // implement debounce input
        const nextValue = e.target.value;
        dispatch(setSearchInput(nextValue))

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            if (nextValue.trim()) {
                const searchParams: URLSearchParams = new URLSearchParams();
                searchParams.set('q', nextValue)
                searchParams.set('limit', '10')
                triggerGetProducts({
                    listType: "ProductSearch",
                    searchParams
                })
            }
        }, 400)
    }

    const handleSearch = (value: string) => {
        const searchParams = new URLSearchParams();
        searchParams.set('q', value)
        navigate(`/search?${searchParams.toString()}`)
    }

    const SearchResults = () => {
        if (searchResults?.items.length) {
            return <ul>
                {
                    searchResults.items.map(product => {
                        return <ProductItem product={product} />
                    })
                }
            </ul>
        } else {
            return <EmptyState />
        }
    }

    const ProductItem = ({ product }: { product: Product }) => <li className={`${styles.productItemWrapper} transition-all`}>
        <img src={product.image} alt={product.productName}
            className={styles.productImg} />
        <div className={styles.productDescription}>
            <div className={styles.productTitle}>{product.productName}</div>
            <div className="text-textMuted text-sm capitalize">{product.category}</div>
        </div>

        <div className={styles.productPrice}>
            ${product.price}
            <span className="line-through ml-1">
                ${product.originalPrice}
            </span>
        </div>
        <button className={`btn ${styles.addToCart}`}>Add</button>
    </li>

    let searchContent;
    if (isLoading) {
        searchContent = <Loading />
    } else if (searchResults) {
        searchContent = <SearchResults />
    } else {
        searchContent = <EmptyState />
    }


    return <div className={`${styles.searchBoxWrapper} ${open ? styles.active : ""}`}
        ref={dropdownRef}>
        <Input.Search onClick={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            allowClear
            size="large"
            // variant="borderless"
            placeholder="Search Products"
            className={styles.searchInput}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={reset}
        />
        {/* Dropdown */}
        {
            !isUninitialized
                ? <div className={`${styles.searchOptions} `}>
                    {searchContent}
                </div>
                : null
        }

    </div>
}