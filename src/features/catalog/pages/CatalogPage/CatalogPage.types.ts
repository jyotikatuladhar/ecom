import type { PageList } from "@/router";
import type { Pagination } from "../../api/catalog.model";

export type PaginationParams = {
    limit: number,
    skip: number,
}

export type ProductListArgs = {
    listType: PageList,
    category?: string,
    searchParams: URLSearchParams,
    pagination: PaginationParams
}
export type SearchParams = { sortBy: string, order: string };

export type MenuItem = {
    label: string;
    key: string;
    icon: React.ReactNode,
    params: SearchParams
}
