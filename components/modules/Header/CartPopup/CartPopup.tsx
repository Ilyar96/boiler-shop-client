import React, { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import Link from 'next/link'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import styles from '@/styles/cartPopup/index.module.scss'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const shoppingCart = useStore($shoppingCart)
    const toggleCartDropdown = () => setOpen(!open)

    return (
      <div
        className={cn(styles.cart, {
          [styles.dark_mode]: mode === 'dark',
        })}
        ref={ref}
      >
        <button className={styles.cart__btn} onClick={toggleCartDropdown}>
          {!!shoppingCart.length && (
            <span className={styles.cart__btn__count}>
              {shoppingCart.length}
            </span>
          )}
          <span className={styles.cart__svg}>
            <ShoppingCartSvg />
          </span>
          <span className={styles.cart__text}>Корзина</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.cart__popup}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => <li key={item.id}>{item.name}</li>)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span className={styles.cart__popup__empty__text}>
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span className={styles.cart__popup__footer__text}>
                    Общая сумма заказа
                  </span>
                  <span className={styles.cart__popup__footer__price}>0</span>
                </div>
                <Link href={'/order'} passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
