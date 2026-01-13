import { Input } from "antd"
import styles from "./SearchInput.module.css"
import { useEffect, useRef, useState, } from "react"
import type { ChangeEventHandler, ChangeEvent, KeyboardEventHandler, SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectInput, setSearchInput } from "./searchSlice";
import { useLazySearchProductsQuery } from "@/features/catalog/api/catalogApi";
import { Loading } from "@/components/Loading";
import { EmptyState } from "@/components/EmptyState";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const [triggerSearchProducts, { data: searchResults, isUninitialized, isLoading, reset }] = useLazySearchProductsQuery();


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        // implement debounce input
        const input = e.target.value;
        if (input.length > 3) {
            dispatch(setSearchInput(e.target.value))
        }
    }

    const handleSearch = (value: string) => {
        // console.log(value);
        // dispatch(searchAsync(value))
        const searchParams = new URLSearchParams();
        searchParams.set('q', value)
        searchParams.set('limit', '10')
        // navigate(`/products/search?${searchParams.toString()}`)
        triggerSearchProducts({ searchParams })
    }

    const SearchResults = () => <ul>
        {
            searchResults?.items.map(product => {
                return <li>{product.productName}</li>
            })
        }
    </ul>

    let searchContent;
    if (isUninitialized) {
        searchContent = <EmptyState />
    } else if (isLoading) {
        searchContent = <Loading />
    } else if (searchResults) {
        searchContent = <SearchResults />
    } else {
        searchContent = <EmptyState />
    }


    return <div className={`${styles.searchBox} ${open ? styles.active : ""}`}
        ref={dropdownRef}>
        <Input.Search onClick={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            size="large"
            // variant="borderless"
            placeholder="Search Products" className={styles.searchInput}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={reset}
        />
        {/* Dropdown */}
        <div className={`${styles.searchOptions} `}>
            {searchContent}
        </div>
    </div>
}