import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IBoilerParts } from '@/types/boilerparts'

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get<IBoilerParts>(url)

  return data
})

export const getBoilerPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get<IBoilerParts>(url)

  return data
})
