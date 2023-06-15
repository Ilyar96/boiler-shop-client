import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import NameInput from '@/components/elements/AuthPage/NameInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { IInputs } from '@/types/auth'
import { signInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const nameOptions = {
  required: 'Введите имя!',
}

const passwordOptions = {
  required: 'Введите пароль!',
}

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })
      reset()
    } catch (err) {
      showAuthError(err)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(styles.form_title, styles.title)}>Войти на сайт</h2>
      <NameInput register={register} errors={errors} options={nameOptions} />
      <PasswordInput
        register={register}
        errors={errors}
        options={passwordOptions}
      />
      <button type="button" className={styles.form__link}>
        Забыли пароль?
      </button>
      <button
        type="submit"
        className={cn(styles.form__button, styles.button, styles.submit)}
        disabled={spinner}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  )
}

export default SignInForm
