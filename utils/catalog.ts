import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, guidGenerator } from './common'

export const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: guidGenerator(),
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price < 10_000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceRange =
    checkPriceFromQuery(+priceToQueryValue) &&
    checkPriceFromQuery(+priceFromQueryValue) &&
    +priceToQueryValue >= +priceFromQueryValue

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceRange,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}
