import { IFiltersPopupTop } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
  closePopup,
}: IFiltersPopupTop) => (
  <div className={styles.catalog__bottom__filters__top}>
    <button
      onClick={closePopup}
      className={styles.catalog__bottom__filters__title}
    >
      {title}
    </button>
    <button
      className={styles.catalog__bottom__filters__reset}
      onClick={resetFilters}
      disabled={resetFilterBtnDisabled}
    >
      {resetBtnText}
    </button>
  </div>
)

export default FiltersPopupTop
