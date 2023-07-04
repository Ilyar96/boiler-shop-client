import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import cn from 'classnames'
import { $mode } from '@/context/mode'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { $boilerPart } from '@/context/boilerPart'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $user } from '@/context/user'
import { toggleCartItem } from '@/utils/shopping-cart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import DashboardSlider from '../DashboardPage/DashboardSlider'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'
import styles from '@/styles/part/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const Part = () => {
  const router = useRouter()
  const mode = useStore($mode)
  const user = useStore($user)
  const boilerParts = useStore($boilerParts)
  const boilerPart = useStore($boilerPart)
  const shoppingCart = useStore($shoppingCart)
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)
  const [spinnerSlider, setSpinnerSlider] = useState(false)
  const isMobile = useMediaQuery(850)
  const isInCart = shoppingCart.some(
    (cartItem) => cartItem.partId === boilerPart.id
  )
  const popularParts =
    boilerParts?.rows?.filter((item) => item.id !== boilerPart.id) || []

  useEffect(() => {
    loadBoilerParts()
  }, [router.asPath])

  const loadBoilerParts = async () => {
    try {
      setSpinnerSlider(true)
      const data = await getBoilerPartsFx({
        url: '/boiler-parts',
        params: {
          limit: 20,
          offset: 0,
          first: 'popular',
        },
      })
      setBoilerParts(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinnerSlider(false), 1000)
    }
  }

  const toggleToCart = () =>
    toggleCartItem(user.username, boilerPart.id, isInCart, setSpinnerToggleCart)

  return (
    <section className={cn({ [styles.dark_mode]: mode === 'dark' })}>
      <div className="container">
        <div className={styles.part__top}>
          <h2 className={styles.part__title}>{boilerPart.name}</h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={styles.part__info__price}>
                {formatPrice(boilerPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                {boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button
                className={cn(styles.part__info__btn, {
                  [styles.in_cart]: isInCart,
                })}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Описание">
                <div className={styles.part__accordion__content}>
                  <h3 className={styles.part__tabs__content__title}>
                    {boilerPart.name}
                  </h3>
                  <p className={styles.part__tabs__content__text}>
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title="Совместимость">
              <div className={styles.part__accordion__content}>
                <p className={styles.part__tabs__content__text}>
                  {boilerPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={styles.part__title}>Вам понравится</h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={popularParts}
          />
        </div>
      </div>
    </section>
  )
}

export default Part
