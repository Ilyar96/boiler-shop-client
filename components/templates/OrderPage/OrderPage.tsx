import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { $shoppingCart, setShoppingCart } from '@/context/shopping-cart'
import { getTotalPrice } from '@/utils/shopping-cart'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { toast } from 'react-toastify'
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { $user } from '@/context/user'
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderPage = () => {
  const router = useRouter()
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinner = useStore(makePaymentFx.pending)
  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const totalPrice = getTotalPrice(shoppingCart)

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])

  const handleAgreementChange = () => {
    setAgreement((agreement) => !agreement)
  }

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: '',
      })

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        resetCart()
      }
    } catch (error) {
      console.log((error as Error).message)
      sessionStorage.removeItem('paymentId')
    }
  }

  const resetCart = async () => {
    await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
    setShoppingCart([])
    sessionStorage.removeItem('paymentId')
  }

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Итого
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>
                  Товары (
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                  )
                </span>
                <span>{totalPrice} P</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>На сумму</span>
                <span className={darkModeClass}>{totalPrice} P</span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: '6px', left: '47%' }}
                  />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
