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
