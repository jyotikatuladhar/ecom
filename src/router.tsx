import { createHashRouter } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import AppLayout from "./layouts/AppLayout";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createHashRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <CatalogPage /> },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])