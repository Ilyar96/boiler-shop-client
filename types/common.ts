import { MultiValue, SingleValue } from 'react-select'

export interface IWrappedComponentProps {
  open: boolean
  setOpen: (arg0: boolean) => void
}

export type ModeType = 'light' | 'dark'

export interface IOption {
  value: string | number
  label: string | number
}

export type SelectionOptionType =
  | MultiValue<IOption>
  | SingleValue<IOption>
  | null

export interface IAccordion {
  children: React.ReactNode
  title: string | false
  titleClass?: string
  arrowOpenClass?: string
  hideArrowClass?: string
  isMobileForFilters?: boolean
  callback?: (arf0: boolean) => void
}
