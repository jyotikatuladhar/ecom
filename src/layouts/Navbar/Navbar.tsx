import { SearchInput } from "@/features/search/SearchInput"
import styles from "./Navbar.module.css"
import { ShoppingCartIcon } from "lucide-react"

export const Navbar = () => {
    return <nav className={styles.navbar}>
        <div className={styles.topNavbar}>
            {/* Top Navigation */}
            <div className={`container ${styles.topInner}`}>
                <span>USD | CAD</span>
                <div className={styles.account}>
                    <a className={styles.signin}>Sign in</a>
                    <a className={styles.signup}>Create an account</a>

                </div>

            </div>
        </div>
        <div className={`container text-textPrimary ${styles.secondaryNavbar}`}>
            <div className={styles.logo}>Styles By Tara.</div>
            <SearchInput />
            <button className={styles.shoppingCart}>
                <ShoppingCartIcon className="text-gray-500 " />
                <span>0</span>
                {/* <button className="flex gap-2 mr-3"><span>0</span></button> */}
            </button>
        </div>
    </nav >
}