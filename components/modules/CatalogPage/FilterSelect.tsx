import React, { useState } from 'react'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { SelectionOptionType } from '@/types/common'
import { $mode } from '@/context/mode'
import { categoryOptions } from '@/utils/selectContents'

import { optionStyles } from '@/styles/searchInput'
import {
  selectStyles,
  controlStyles,
  menuStyles,
} from '@/styles/catalog/select'

const FilterSelect = () => {
  const mode = useStore($mode)
  const [categoryOption, setCategoryOption] =
    useState<SelectionOptionType>(null)

  const handleCategoryOptionChange = (selectedOption: SelectionOptionType) => {
    setCategoryOption(selectedOption)
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
