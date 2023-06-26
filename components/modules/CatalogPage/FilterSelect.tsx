import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { IOption, SelectionOptionType } from '@/types/common'
import { $mode } from '@/context/mode'
import { categoryOptions } from '@/utils/selectContents'
import {
  selectStyles,
  controlStyles,
  menuStyles,
} from '@/styles/catalog/select'
import { $boilerParts } from '@/context/boilerParts'
import { optionStyles } from '@/styles/searchInput'

const FilterSelect = () => {
  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  const router = useRouter()
  const [categoryOption, setCategoryOption] =
    useState<SelectionOptionType>(null)

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query?.first) {
        case 'cheap':
          updateCategoryOption('Cначала дешевые')
          break
        case 'expensive':
          updateCategoryOption('Cначала дорогие')
          break
        default:
          updateCategoryOption('По популярности')
      }
    }
  }, [boilerParts.rows, router.query.first])

  const updateCategoryOption = (value: string) => {
    setCategoryOption({ value, label: value })
  }

  const updateRouteParam = (first: string) =>
    router.push({ query: { ...router.query, first } }, undefined, {
      shallow: true,
    })

  const handleCategoryOptionChange = (selectedOption: SelectionOptionType) => {
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        updateRouteParam('cheap')
        break
      case 'Сначала дорогие':
        updateRouteParam('expensive')
        break
      default:
        updateRouteParam('popular')
    }
  }

  return (
    <>
      <Select
        placeholder="Выбрать сортировку"
        value={categoryOption || categoryOptions[0]}
        onChange={handleCategoryOptionChange}
        styles={{
          ...selectStyles,
          control: (defaultStyles) => ({
            ...controlStyles(defaultStyles, mode),
          }),
          container: (defaultStyles) => ({
            ...defaultStyles,
            maxWidth: 241,
          }),
          input: (defaultStyles) => ({
            ...defaultStyles,
            color: mode === 'dark' ? '#f2f2f2' : '#222222',
          }),
          menu: (defaultStyles) => ({
            ...menuStyles(defaultStyles, mode),
          }),
          option: (defaultStyles, state) => ({
            ...optionStyles(defaultStyles, state, mode),
          }),
        }}
        options={categoryOptions}
      />
    </>
  )
}

export default FilterSelect
