import React from 'react'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { toast } from 'react-toastify'
import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { IInputs } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import { signUpFx } from '@/app/api/auth'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      const userData = await signUpFx({
        url: '/users/signup',
        email: data.email,
        username: data.name,
        password: data.password,
      })
      console.log('data: ', userData)
      reset()
      switchForm()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(styles.form_title, styles.title)}>Создать аккаунт</h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button className={cn(styles.form__button, styles.button, styles.submit)}>
        SIGN UP
      </button>
    </form>
  )
}

export default SignUpForm
