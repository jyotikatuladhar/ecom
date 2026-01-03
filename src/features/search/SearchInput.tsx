import { Input } from "antd"
import styles from "./SearchInput.module.css"

export const SearchInput = () => {
    return <div >
        <Input.Search size="large" variant="borderless" placeholder="Search Products" className={styles.search} />
    </div>
}