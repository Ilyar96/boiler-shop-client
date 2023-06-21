import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IBoilerParts } from '@/types/boilerparts'

export const getBestsellersOrNewParts = createEffect(async (url) => {
  const { data } = await api.get<IBoilerParts>(url)

  return data
})
