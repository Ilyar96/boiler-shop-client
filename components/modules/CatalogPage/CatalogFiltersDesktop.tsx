import React from 'react'
import { useStore } from 'effector-react'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import {
  $boilerManufacturers,
  $partManufacturers,
  setBoilerManufacturers,
  setPartManufacturers,
  updateBoilerManufacturer,
  updatePartManufacturer,
} from '@/context/boilerParts'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = () => {
  const boilerManufaturers = useStore($boilerManufacturers)
  const partManufacturers = useStore($partManufacturers)

  return (
    <div className={styles.catalog__bottom__filters}>
      <h3 className={styles.catalog__bottom__filters__title}>Фильтры</h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={boilerManufaturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
      </div>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartManufacturer}
          setManufacturer={setPartManufacturers}
        />
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
