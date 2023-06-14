import React from 'react'
import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const options = {
  required: 'Введите email!',
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Неправильный Email!',
  },
}

const EmailInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('email', options)}
      className={styles.form__input}
      type="text"
      placeholder="Email"
      inputMode="email"
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email.message}</span>
    )}
  </label>
)

export default EmailInput
