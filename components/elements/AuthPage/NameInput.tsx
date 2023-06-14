import React from 'react'
import { IAuthPageInput } from '@/types/auth'
import { declinationOfNum } from '@/utils/common'
import styles from '@/styles/auth/index.module.scss'

const minLength = 2
const maxLength = 20
const options = {
  required: 'Введите имя!',
  minLength,
  maxLength,
  pattern: {
    value: /[а-яА-Яa-zA-ZёЁ]*$/,
    message: 'Недопустимое значение!',
  },
}

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('name', options)}
      className={styles.form__input}
      type="text"
      placeholder="Имя"
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>
        Минимум {minLength}{' '}
        {declinationOfNum(minLength, ['символ', 'символа', 'символов'])}
      </span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>
        Максимально допускается {maxLength}{' '}
        {declinationOfNum(maxLength, ['символ', 'символа', 'символов'])}
      </span>
    )}
  </label>
)

export default NameInput
