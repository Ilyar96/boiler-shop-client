import React from 'react'
import { IAuthPageInput } from '@/types/auth'
import { declinationOfNum } from '@/utils/common'
import styles from '@/styles/auth/index.module.scss'

const minLength = 4
const maxLength = 20
const regExp = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{' + minLength + ',})$'
)
const options = {
  required: 'Введите пароль!',
  minLength,
  maxLength,
  pattern: {
    value: regExp,
    message:
      // eslint-disable-next-line max-len
      'Пароль должен содеражать минимум 1 число, 1 символ в верхнем регистре, 1 символ в нижнем регистре, допускается только латиница',
  },
}

const PasswordInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('password', options)}
      className={styles.form__input}
      type="password"
      placeholder="Пароль"
    />
    {errors.password && (
      <span className={styles.error_alert}>{errors.password.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>
        Минимум {minLength}{' '}
        {declinationOfNum(minLength, ['символ', 'символа', 'символов'])}
      </span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>
        Максимально допускается {maxLength}{' '}
        {declinationOfNum(maxLength, ['символ', 'символа', 'символов'])}
      </span>
    )}
  </label>
)

export default PasswordInput
