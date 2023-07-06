/* eslint-disable prettier/prettier */
import {
  StylesConfig,
  OptionProps,
  GroupBase,
  CSSObjectWithLabel,
} from 'react-select'
import { IOption } from '../../types/common'

export const controlStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #9E9E9E',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '#9E9E9E',
  },
  '& .css-1dimb5e-singleValue': {
    color: theme === 'dark' ? '#f2f2f2' : '#222222',
  },
  borderRight: 'none',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
})

export const menuStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  boxShadow: 'none',
  borderRadius: '4px',
  border: 'none',
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
  width: 'calc(100% + 40px)',
  minHeight: 30,
})

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  state: OptionProps<IOption, boolean, GroupBase<IOption>>,
  theme: string
) => {
  const backgroundForLightMode = state.isSelected
    ? '#2d2d2d'
    : state.isFocused
    ? '#9e9e9e'
    : '#ffffff'
  const backgroundForDarkMode = state.isSelected
    ? '#ffffff'
    : state.isFocused
    ? '#9e9e9e'
    : '#2d2d2d'

  const colorForLightMode = state.isSelected ? '#f2f2f2' : '#222222'
  const colorForDarkMode = state.isSelected ? '#222222' : '#f2f2f2'

  const backgroundColor = 'dark'
    ? backgroundForDarkMode
    : backgroundForLightMode
  const color = theme === 'dark' ? colorForDarkMode : colorForLightMode

  return {
    ...defaultStyles,
    cursor: 'pointer',
    padding: '6px 12px',
    margin: 0,
    '&:active': {
      backgroundColor,
      color,
    },
    backgroundColor,
    color,
  }
}

export const inputStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 30,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'grey',
    },
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#b9babb',
  }),
}
