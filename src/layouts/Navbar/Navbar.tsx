import styles from "./Navbar.module.css"
import { ShoppingCartIcon } from "lucide-react"
import { Divider } from "antd"

export const Navbar = () => {
    return <nav className={styles.navbar}>
        <div className={styles.topNavbar}>
            {/* Top Navigation */}
            <div className={`container ${styles.topInner}`}>
                <span>USD</span>

                <div className={styles.account}>
                    <a href="/login" className={styles.signin}>Sign in</a>
                    <a href="/signup" className={styles.signup}>Create an account</a>
                    <Divider orientation="vertical" />
                    <a href="mailto:query@tara.com">query@tara.com</a>
                </div>

            </div>
        </div>
        <div className={`container text-primary ${styles.secondaryNavbar}`}>
            <div className={styles.logo}>
                <a href="/">Styles By Tara</a>
            </div>
            <ul className={styles.navlinks}>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/shop">Shop</a>
                </li>
                <li>
                    <a href="/blog">Blog</a>
                </li>
            </ul>
            {/* <SearchInput /> */}
            <button className={styles.shoppingCart} aria-label="Show Shopping Cart" title="Show Shopping Cart">
                <ShoppingCartIcon className="text-textMuted" />
                {/* <span>0</span> */}
                {/* <button className="flex gap-2 mr-3"><span>0</span></button> */}
            </button>
        </div>
    </nav >
}