import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import ProfileDropdown from './ProfileDropdown'
import CityButton from '@/components/elements/CityButton/CityButton'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePopup } from '@/hooks/usePopup'
import styles from '@/styles/header/index.module.scss'

const navRoutes = [
  { href: '/shipping-payment', title: 'Доставка и оплата' },
  { href: '/about', title: 'О компании' },
  { href: '/catalog', title: 'Каталог' },
  { href: '/contacts', title: 'Контакты' },
  { href: '/wholesale-buyers', title: 'Оптовым покупателям' },
]

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const { open, toggleOpen, closePopup } = usePopup()

  return (
    <div className={cn(styles.header__top)}>
      <div className={cn('container', styles.header__top__container)}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button
            className={cn(styles.burger_menu, { [styles.open]: open })}
            onClick={toggleOpen}
          >
            <span />
            <span />
            <span />
          </button>
        )}

        <nav
          className={cn(styles.header__nav, {
            [styles.open]: isMedia950 && open,
          })}
        >
          <ul className={styles.header__nav__list}>
            {navRoutes.map(({ href, title }) => (
              <li className={styles.header__nav__list__item} key={href}>
                <Link href={href} passHref legacyBehavior>
                  <a
                    className={styles.header__nav__list__item__link}
                    onClick={closePopup}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
            {isMedia950 && (
              <>
                <li className={styles.header__nav__list__item}>
                  <CityButton />
                </li>
                <li className={styles.header__nav__list__item}>
                  <ModeToggler />
                </li>
              </>
            )}
          </ul>
        </nav>

        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
