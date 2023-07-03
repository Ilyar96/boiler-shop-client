import React, { forwardRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import Link from 'next/link'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { $shoppingCart, setShoppingCart } from '@/context/shopping-cart'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import styles from '@/styles/cartPopup/index.module.scss'
import CartPopupItem from './CartPopupItem'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { $user } from '@/context/user'
import { toast } from 'react-toastify'
import { formatPrice } from '@/utils/common'
import { getTotalPrice } from '@/utils/shopping-cart'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const shoppingCart = useStore($shoppingCart)
    const toggleCartDropdown = () => setOpen(!open)

    useEffect(() => {
      loadCartItems()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadCartItems = async () => {
      try {
        const data = await getCartItemsFx(`/shopping-cart/${user.userId}`)
        setShoppingCart(data)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

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
                  shoppingCart.map((item) => (
                    <CartPopupItem key={item.id} item={item} />
                  ))
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
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(getTotalPrice(shoppingCart))} P
                  </span>
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
