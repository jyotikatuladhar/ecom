import styles from "./SearchInput.module.css"

export const SearchInput = () => {
    return <div >
        <input placeholder="Search Products" className={styles.search} />
    </div>
}