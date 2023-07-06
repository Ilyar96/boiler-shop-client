import { MutableRefObject, useRef, useState } from 'react'
import Select, {
  GroupBase,
  InputActionMeta,
  OptionsOrGroups,
} from 'react-select'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { $mode } from '@/context/mode'
import { IOption, SelectionOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'
import {
  createSelectOption,
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody,
} from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/header/index.module.scss'
import { getPartByNameFx, searchPartsFx } from '@/app/api/boilerparts'
import {
  NoOptionsMessage,
  NoOptionsSpinner,
} from '../SelectOptionsMessage/SelectOptionsMessage'

const SearchInput = () => {
  const router = useRouter()
  const mode = useStore($mode)
  const zIndex = useStore($searchInputZIndex)
  const spinner = useStore(searchPartsFx.pending)
  const [searchOption, setSearchOption] = useState<SelectionOptionType>(null)
  const [inputValue, setInputValue] = useState('')

  const [options, setOptions] = useState<
    OptionsOrGroups<IOption, GroupBase<IOption>>
  >([])
  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLButtonElement>
  const delayCallback = useDebounceCallback(1000)

  const onSearchInputChange = (search: string, { action }: InputActionMeta) => {
    search && setInputValue(search)
    delayCallback(() => searchPart(search))
  }

  const searchPart = async (search: string) => {
    try {
      const data = await searchPartsFx({ url: '/boiler-parts/search', search })
      const names = data.rows.map((item) => item.name).map(createSelectOption)

      setOptions(names)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const getPartAndRedirect = async (name: string) => {
    const boilerPart = await getPartByNameFx({
      url: '/boiler-parts/name',
      name,
    })

    if (!boilerPart?.id) {
      toast.warning('Товар не найден')
      return
    }

    router.push(`/catalog/${boilerPart.id}`)
  }

  const handleOnClick = () => {
    if (!inputValue) {
      return
    }

    getPartAndRedirect(inputValue)
  }

  const handleSearchOptionChange = (selectedOption: SelectionOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }
    setSearchOption(selectedOption)
    removeClassNamesForOverlayAndBody()

    const name = (selectedOption as IOption)?.value as string
    name && getPartAndRedirect(name)
  }

  const onFocusSearch = () => {
    toggleClassNamesForOverlayAndBody('open-search')
    setSearchInputZIndex(100)
  }

  const onBlur = (e) => {
    setSearchInputZIndex(1)
    removeClassNamesForOverlayAndBody()
  }

  const onSearchMenuOpen = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    })

    btnRef.current.style.border = 'none'
    btnRef.current.style.borderBottomRightRadius = '0'
    borderRef.current.style.display = 'block'
  }

  const onSearchMenuClose = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    })

    btnRef.current.style.border = '1px solid #9e9e9e'
    btnRef.current.style.borderLeft = 'none'
    btnRef.current.style.borderBottomRightRadius = '4px'
    borderRef.current.style.display = 'none'
  }

  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          components={{
            NoOptionsMessage: NoOptionsMessage,
            LoadingMessage: NoOptionsSpinner,
          }}
          placeholder="Я ищу..."
          value={searchOption}
          onChange={handleSearchOptionChange}
          onFocus={onFocusSearch}
          onBlur={onBlur}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
          onInputChange={onSearchInputChange}
          isLoading={spinner}
          isClearable
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles,
            }),
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              zIndex,
              transition: 'none',
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              ...onMenuOpenControlStyles,
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: 0,
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          options={options}
        />
        <span ref={borderRef} className={styles.header__search__border} />
      </div>
      <button
        className={cn(styles.header__search__btn, {
          [styles.header__search__btn__search_focused]: zIndex === 100,
        })}
        onClick={handleOnClick}
        ref={btnRef}
      >
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  )
}

export default SearchInput
