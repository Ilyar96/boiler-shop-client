import React, { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import cn from 'classnames'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import { $mode } from '@/context/mode'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import {
  $boilerManufacturers,
  $boilerParts,
  $partManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartManufacturers,
  updateBoilerManufacturer,
  updatePartManufacturer,
} from '@/context/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { IFilterCheckboxItem, IQueryParams } from '@/types/catalog'
import { IBoilerPartsQuery } from '@/types/boilerparts'
import { BOILER_PARTS_PER_PAGE, initialCatalogPriceRange } from '@/constants'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { smoothScrollToTop } from '@/utils/common'
import { usePopup } from '@/hooks/usePopup'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const boilerParts = useStore($boilerParts)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partManufacturers = useStore($partManufacturers)
  const router = useRouter()
  const mode = useStore($mode)
  const [spinner, setSpinner] = useState(false)
  const { closePopup, open, toggleOpen } = usePopup()
  const [isFiltersReset, isFiltersResetDispatch] = useReducer(
    (state) => ++state,
    0
  )
  const [priceRange, setPriceRange] = useState(initialCatalogPriceRange)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const pageCount = Math.ceil(boilerParts.count / BOILER_PARTS_PER_PAGE)
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartManufacturerChecked = partManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartManufacturerChecked
  )

  useEffect(() => {
    loadBoilerParts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.first, currentPage, isFiltersReset])

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected)
    router.replace(
      { query: { ...router.query, offset: event.selected + 1 } },
      undefined,
      { shallow: true }
    )
    smoothScrollToTop()
  }

  const getBoilerPartQueryParams = (): IBoilerPartsQuery => {
    const first = window !== undefined ? router.query.first : query.first

    const queryParams: IBoilerPartsQuery = {
      offset: currentPage,
      limit: BOILER_PARTS_PER_PAGE,
    }

    if (first && typeof first === 'string') {
      queryParams.first = first
    }

    return queryParams
  }

  const loadBoilerParts = async () => {
    const params = {
      ...router.query,
      ...getBoilerPartQueryParams(),
      priceFrom: priceRange[0],
      priceTo: priceRange[1],
    }

    if (!isValidOffset) {
      router.replace(
        {
          query: {
            ...router.query,
            offset: 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(0)
      params.offset = 0
    }

    try {
      setSpinner(true)

      const data = await getBoilerPartsFx({ url: '/boiler-parts', params })

      if (data.count > 0 && !data.rows.length) {
        const maxPage = Math.ceil(data.count / BOILER_PARTS_PER_PAGE)

        router.replace(
          {
            query: {
              ...router.query,
              offset: maxPage,
            },
          },
          undefined,
          { shallow: true }
        )
        setCurrentPage(maxPage - 1)
      }

      setBoilerParts(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetManufacturersCb = (manufacturersList: IFilterCheckboxItem[]) =>
    manufacturersList.map((item) => ({
      ...item,
      checked: false,
    }))

  const resetFilters = () => {
    const query = router.query
    delete query.priceFrom
    delete query.priceTo
    delete query.boiler
    delete query.parts
    query.first = 'popular'

    router.replace({ query })

    setBoilerManufacturers(resetManufacturersCb(boilerManufacturers))
    setPartManufacturers(resetManufacturersCb(partManufacturers))
    setPriceRange(initialCatalogPriceRange)
    setIsPriceRangeChanged(false)
    isFiltersResetDispatch()
  }
  return (
    <section
      className={cn(styles.catalog, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.catalog__container)}>
        <h2 className={styles.catalog__title}>Каталог товаров</h2>
        <div className={styles.catalog__top}>
          {isAnyBoilerManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Производитель котлов:"
                manufacturersList={boilerManufacturers}
                event={updateBoilerManufacturer}
              />
            </AnimatePresence>
          )}
          {isAnyPartManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Производитель запчастей:"
                manufacturersList={partManufacturers}
                event={updatePartManufacturer}
              />
            </AnimatePresence>
          )}
          <div className={styles.catalog__top__inner}>
            {}
            <button
              className={styles.catalog__top__reset}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              setCurrentPage={setCurrentPage}
              setCatalogSpinner={setSpinner}
              filtersMobileOpen={open}
              closePopup={closePopup}
            />

            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(BOILER_PARTS_PER_PAGE)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                {boilerParts.rows?.length ? (
                  <ul className={styles.catalog__list}>
                    {boilerParts.rows.map((item) => (
                      <CatalogItem item={item} key={item.id} />
                    ))}
                  </ul>
                ) : (
                  <span className={styles.catalog__list__empty}>
                    Список товаров пуст...
                  </span>
                )}
              </>
            )}
          </div>
          {!spinner && boilerParts.count > BOILER_PARTS_PER_PAGE && (
            <ReactPaginate
              containerClassName={styles.catalog__bottom__list}
              pageClassName={styles.catalog__bottom__list__item}
              pageLinkClassName={styles.catalog__bottom__list__item__link}
              previousClassName={styles.catalog__bottom__list__prev}
              nextClassName={styles.catalog__bottom__list__next}
              breakClassName={styles.catalog__bottom__list__break}
              breakLinkClassName={styles.catalog__bottom__list__break__link}
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={pageCount}
              forcePage={currentPage}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
