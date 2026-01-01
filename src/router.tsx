import { createHashRouter } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import AppLayout from "./App";
import NotFoundPage from "./pages/NotFoundPage";

console.log("Router Loaded ")
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