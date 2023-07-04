import { createEffect } from 'effector'
import api from '../axiosClient'
import { ICheckPayFx, IMakePayFx } from '@/types/order'

export const makePaymentFx = createEffect(
  async ({ url, amount }: IMakePayFx) => {
    const { data } = await api.post(url, { amount })

    return data
  }
)

export const checkPaymentFx = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await api.post(url, { paymentId })

    return data
  }
)
