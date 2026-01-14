import type { PageList } from "@/router";

export type QueryData = {
    listType: PageList,
    category?: string,
    searchParams?: URLSearchParams
};

export type SearchParams = { sortBy: string, order: string };

export type MenuItem = {
    label: string;
    key: string;
    icon: React.ReactNode,
    params: SearchParams
}
