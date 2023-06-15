import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { IInputs } from '@/types/auth'
import { signUpFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
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
      const userData = await signUpFx({
        url: '/users/signup',
        email: data.email,
        username: data.name,
        password: data.password,
      })

      if (userData) {
        reset()
        switchForm()
      }
    } catch (err) {
      console.log(err)
      showAuthError(err)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(styles.form_title, styles.title)}>Создать аккаунт</h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        type="submit"
        className={cn(styles.form__button, styles.button, styles.submit)}
        disabled={spinner}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN UP'}
      </button>
    </form>
  )
}

export default SignUpForm
