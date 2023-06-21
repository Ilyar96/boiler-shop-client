import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
  options?: RegisterOptions<IInputs, keyof IInputs>
}

export interface ISignInFx {
  url: string
  username: string
  password: string
}

export interface ISignUpFx extends ISignInFx {
  email: string
}

export interface IUser {
  username: string
  userId: number | string
  email: string
}
