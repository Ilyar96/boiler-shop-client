import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { ISignUpFx } from '@/types/auth'
import api from '../axiosClient'

export const signUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    return data
  }
)
