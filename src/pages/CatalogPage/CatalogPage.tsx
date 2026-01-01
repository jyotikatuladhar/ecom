import { useEffect } from "react";

const CatalogPage = () => {
    useEffect(() => {
        console.log("Mounted");
    }, [])
    return <main>
        <section>
            Catalog Page
        </section>
    </main>
}

export default CatalogPage;