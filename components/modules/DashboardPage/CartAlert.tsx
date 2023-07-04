import Link from 'next/link'
import { useStore } from 'effector-react'
import { declinationOfNum, formatPrice } from '@/utils/common'
import { ICartAlertProps } from '@/types/dashboard'
import { getTotalPrice } from '@/utils/shopping-cart'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/dashboard/index.module.scss'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = getTotalPrice(shoppingCart)

  return (
    <>
      <div className={styles.dashboard__alert__left}>
        <span>
          В корзине {count}{' '}
          {declinationOfNum(count, ['товар', 'товара', 'товаров'])}
        </span>
        <span>На сумму {formatPrice(totalPrice)} P</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/cart" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default CartAlert
