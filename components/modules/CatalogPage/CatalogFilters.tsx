import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps, IFilterCheckboxItem } from '@/types/catalog'
import {
  $boilerManufacturers,
  $partManufacturers,
  setBoilerManufacturersFromQuery,
  setBoilerParts,
  setPartManufacturersFromQuery,
} from '@/context/boilerParts'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { BOILER_PARTS_PER_PAGE } from '@/constants'
import { smoothScrollToTop } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import { checkQueryParams } from '@/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  setCurrentPage,
  setCatalogSpinner,
  filtersMobileOpen,
  closePopup,
}: ICatalogFiltersProps) => {
  const router = useRouter()
  const isMobile = useMediaQuery(820)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partManufacturers = useStore($partManufacturers)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    applyFiltersFromQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCheckedManufacturersTitleList = (
    manufacturers: IFilterCheckboxItem[]
  ) => manufacturers.filter((item) => item.checked).map((item) => item.title)

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceRange,
        boilerQueryValue,
        partsQueryValue,
        priceFromQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router)

      if (isValidBoilerQuery) {
        setBoilerManufacturersFromQuery(boilerQueryValue)
      }

      if (isValidPartsQuery) {
        setPartManufacturersFromQuery(partsQueryValue)
      }

      if (isValidPriceRange) {
        setPriceRange([+priceFromQueryValue, +priceToQueryValue])
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { priceFrom, priceTo, ...query } = router.query
        router.replace({ query }, undefined, { shallow: true })
      }
    } catch (error) {
      const err = error as Error
      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }
      toast.error(err.message)
    }
  }

  const applyFilters = async () => {
    try {
      setCatalogSpinner(true)
      setSpinner(true)
      setCurrentPage(0)

      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const boilers = getCheckedManufacturersTitleList(boilerManufacturers)
      const parts = getCheckedManufacturersTitleList(partManufacturers)
      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))

      const query: Record<string, string | number> = {
        ...router.query,
        offset: 0,
        limit: BOILER_PARTS_PER_PAGE,
      }

      if (boilers.length) {
        query.boiler = encodedBoilerQuery
      }

      if (parts.length) {
        query.parts = encodedPartsQuery
      }

      if (isPriceRangeChanged) {
        query.priceFrom = priceFrom
        query.priceTo = priceTo
      }

      router.push(
        {
          query: {
            ...router.query,
            ...query,
            offset: +query.offset + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      const data = await getBoilerPartsFx({
        url: `/boiler-parts`,
        params: query,
      })

      setBoilerParts(data)
      smoothScrollToTop()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
      setTimeout(() => setCatalogSpinner(false), 1000)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          applyFilters={applyFilters}
          closePopup={closePopup}
          filtersMobileOpen={filtersMobileOpen}
          priceRange={priceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          spinner={spinner}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          spinner={spinner}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
