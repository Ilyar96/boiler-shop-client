import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { $user } from '@/context/user'
import styles from '@/styles/catalog/index.module.scss'
import Image from 'next/image'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useState } from 'react'
import cn from 'classnames'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => {}

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Image
        width={224}
        height={184}
        className={styles.catalog__list__item__image}
        src={JSON.parse(item.images)[0]}
        alt={item.name}
      />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={cn(styles.catalog__list__item__cart, {
          [styles.added]: isInCart,
        })}
        onClick={toggleToCart}
        disabled={spinner}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem