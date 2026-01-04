import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const CatalogPage = () => {

    return <>
        <section >
            <SearchBar />
            {/* Catalog Page */}
            <ProductGrid />
        </section>
    </>
}

export default CatalogPage;