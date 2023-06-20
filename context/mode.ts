import { createDomain } from 'effector-next'
import { ModeType } from '@/types/common'

const mode = createDomain()

export const setMode = mode.createEvent<ModeType>()

export const $mode = mode
  .createStore<ModeType>('light')
  .on(setMode, (_, mode) => mode)
