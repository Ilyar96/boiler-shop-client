import React, { MutableRefObject, useRef } from 'react'
import { useStore } from 'effector-react'
import cn from 'classnames'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import SignUpForm from '@/components//modules/AuthPage/SignUpForm'
import SignInForm from '@/components//modules/AuthPage/SignInForm'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/auth/index.module.scss'

export const AuthPage = () => {
  const mode = useStore($mode)
  const isMedia800 = useMediaQuery(800)
  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircleTop = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircleBottom = useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>

  const switchForm = () => {
    switchCtn.current.classList.add(styles.is_gx)
    setTimeout(function () {
      switchCtn.current.classList.remove(styles.is_gx)
    }, 1500)

    switchCtn.current.classList.toggle(styles.is_txr)
    switchCircleTop.current.classList.toggle(styles.is_txr)
    switchCircleBottom.current.classList.toggle(styles.is_txr)

    switchC1.current.classList.toggle(styles.is_hidden)
    switchC2.current.classList.toggle(styles.is_hidden)
    aContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_z200)
  }

  return (
    <div
      className={cn(styles.main, {
        [styles.dark_mode]: mode === 'dark',
      })}
    >
      <div className={styles.mode_toggle}>
        <ModeToggler />
      </div>
      <div
        className={cn(styles.container, styles.a_container)}
        ref={aContainer}
      >
        <div className={styles.container__inner}>
          <SignUpForm switchForm={switchForm} />
        </div>
      </div>

      <div
        className={cn(styles.container, styles.b_container)}
        ref={bContainer}
      >
        <div className={styles.container__inner}>
          <SignInForm />
        </div>
      </div>

      <div className={cn(styles.switch)} ref={switchCtn}>
        <div className={styles.switch__circle} ref={switchCircleBottom} />
        <div
          className={cn(styles.switch__circle, styles.switch__circle_t)}
          ref={switchCircleTop}
        />
        <div className={styles.switch__container} ref={switchC1}>
          {!isMedia800 && (
            <>
              <h2 className={(styles.switch__title, styles.title)}>
                Добро пожаловать!
              </h2>
              <p className={cn(styles.switch__description, styles.description)}>
                Чтобы оставаться на связи с нами, пожалуйста, войдите под своей
                личной информацией
              </p>
            </>
          )}

          <button
            className={cn(
              styles.switch__button,
              styles.button,
              styles.switch_btn
            )}
            onClick={switchForm}
          >
            SIGN IN
          </button>
        </div>
        <div
          className={cn(styles.switch__container, styles.is_hidden)}
          ref={switchC2}
        >
          {!isMedia800 && (
            <>
              <h2 className={cn(styles.switch__title, styles.title)}>
                Привет, друг!
              </h2>
              <p className={cn(styles.switch__description, styles.description)}>
                Введите свои личные данные и начните путешествие с нами
              </p>
            </>
          )}

          <button
            className={cn(
              styles.switch__button,
              styles.button,
              styles.switch_btn
            )}
            onClick={switchForm}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  )
}
