import { useState } from 'react'
import Select from 'react-select'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { SelectionOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/header/index.module.scss'

const SearchInput = () => {
  const mode = useStore($mode)
  const [searchOption, setSearchOption] = useState<SelectionOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectionOptionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <>
      <Select
        placeholder="Я ищу..."
        value={searchOption}
        onChange={handleSearchOptionChange}
        styles={{
          ...inputStyles,
          control: (defaultStyles) => ({
            ...controlStyles(defaultStyles, mode),
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
        options={[
          1, 5, 6, 7, 8, 1, 5, 6, 7, 8, 1, 5, 6, 7, 8, 1, 5, 6, 7, 8,
        ].map((item) => ({ value: item, label: item }))}
      />
    </>
  )
}

export default SearchInput
