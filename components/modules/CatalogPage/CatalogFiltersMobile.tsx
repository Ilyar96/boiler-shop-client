import { useState } from 'react'
import { useStore } from 'effector-react'
import cn from 'classnames'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import FiltersPopup from './FiltersPopup'
import {
  $boilerManufacturers,
  $partManufacturers,
  setBoilerManufacturers,
  setPartManufacturers,
  updateBoilerManufacturer,
  updatePartManufacturer,
} from '@/context/boilerParts'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partManufacturers)
  const [openBoilers, setOpenBoilers] = useState(false)
  const [openParts, setOpenParts] = useState(false)
  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const isMobile = useMediaQuery(820)

  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(
      boilerManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const resetAllPartsManufacturers = () =>
    setPartManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={cn(styles.catalog__bottom__filters, {
        [styles.open]: filtersMobileOpen,
      })}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={styles.filters__manufacturer__btn}
            onClick={handleOpenBoilers}
          >
            Производитель котлов
          </button>
          <FiltersPopup
            title="Производитель котлов"
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            updateManufacturer={updateBoilerManufacturer}
            setManufacturer={setBoilerManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={boilerManufacturers}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={styles.filters__manufacturer__btn}
            onClick={handleOpenParts}
          >
            Производитель запчастей
          </button>
          <FiltersPopup
            title="Производитель запчастей"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartManufacturer}
            setManufacturer={setPartManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={styles.filters__manufacturer__btn}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
