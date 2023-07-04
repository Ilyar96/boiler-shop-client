import { createEffect } from 'effector-next'
import api from '../axiosClient'
import {
  IBoilerPart,
  IBoilerParts,
  IBoilerPartsFilters,
} from '@/types/boilerparts'

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get<IBoilerParts>(url)

  return data
})

export const getBoilerPartsFx = createEffect(
  async ({ url, params }: { url: string; params?: IBoilerPartsFilters }) => {
    const { data } = await api.get<IBoilerParts>(url, {
      params,
    })

    return data
  }
)

export const getBoilerPartFx = createEffect(async (url: string) => {
  const { data } = await api.get<IBoilerPart>(url)
  return data
})
