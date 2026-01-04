import { CategorySelect } from "./CategorySelect/CategorySelect"
import { Contact } from "./Contact/Contact"
import { SearchInput } from "./SearchInput/SearchInput"
import styles from "./SearchBar.module.css"

export const SearchBar = () => {
    return <div className={` ${styles.wrapper}`}>
        <CategorySelect />
        <SearchInput />
        <Contact />
    </div>
}