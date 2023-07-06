import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import {
  IBoilerPart,
  IBoilerParts,
  IBoilerPartsQuery,
} from '@/types/boilerparts'

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get<IBoilerParts>(url)

  return data
})

export const getBoilerPartsFx = createEffect(
  async ({ url, params }: { url: string; params?: IBoilerPartsQuery }) => {
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

export const searchPartsFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post<IBoilerParts>(url, { search })

    return data
  }
)

export const getPartByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post<IBoilerPart>(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
