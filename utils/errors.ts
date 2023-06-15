import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { HTTPStatus } from '@/constants'

export const showAuthError = (err: unknown) => {
  const axiosError = err as AxiosError

  if (axiosError.response) {
    if (axiosError.response.status === HTTPStatus.UNAUTHORIZED) {
      toast.error('Неверное имя пользователя или пароль')
      return
    }
  }

  toast.error((err as Error).message)
}
