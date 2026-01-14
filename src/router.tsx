import { createHashRouter } from "react-router-dom";
import CatalogPage from "./features/catalog/pages/CatalogPage";
import AppLayout from "./layouts/AppLayout";
import NotFoundPage from "./pages/NotFoundPage";

export type PageList = 'ProductList' | 'ProductSearch' | 'CategoryProducts'

export const router = createHashRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <CatalogPage listType="ProductList" /> },
            { path: "/category/:slug", element: <CatalogPage listType={"CategoryProducts"} /> },
            { path: "/search", element: <CatalogPage listType="ProductSearch" /> },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])