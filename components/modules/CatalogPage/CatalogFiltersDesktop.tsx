import React from 'react'
import { useStore } from 'effector-react'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import Accordion from '../../elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import {
  $boilerManufacturers,
  $partManufacturers,
  setBoilerManufacturers,
  setPartManufacturers,
  updateBoilerManufacturer,
  updatePartManufacturer,
} from '@/context/boilerParts'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatalogFiltersDesktop = ({
  priceRange,
  setIsPriceRangeChanged,
  setPriceRange,
  resetFilterBtnDisabled,
  resetFilters,
  spinner,
  applyFilters,
}: ICatalogFilterDesktopProps) => {
  const boilerManufacturers = useStore($boilerManufacturers)
  const partManufacturers = useStore($partManufacturers)

  return (
    <div className={styles.catalog__bottom__filters}>
      <h3 className={styles.catalog__bottom__filters__title}>Фильтры</h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={styles.filters__manufacturer__btn}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
            />
          </div>
        </Accordion>
      </div>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartManufacturer}
          setManufacturer={setPartManufacturers}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFilters}
          disabled={spinner}
        >
          {spinner ? <span className={spinnerStyles.spinner} /> : 'Показать'}
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={resetFilters}
          disabled={resetFilterBtnDisabled}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
