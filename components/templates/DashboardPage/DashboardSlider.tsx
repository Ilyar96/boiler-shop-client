/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import Slider from 'react-slick'
import cn from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSlider } from '@/types/dashboard'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { formatPrice } from '@/utils/common'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardSlider = ({
  items,
  spinner,
  goToPartPage,
}: IDashboardSlider) => {
  const mode = useStore($mode)
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia560 ? '276px' : '390px'
      list.style.padding = '0 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: isMedia768 ? 1 : 2,
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  return (
    <Slider
      {...settings}
      className={cn(styles.dashboard__slider, {
        [styles.dark_mode]: mode === 'dark',
      })}
    >
      {spinner ? (
        [...Array(8)].map((_, i) => (
          <div className={skeletonStyles.skeleton__item} key={i} style={width}>
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <div className={styles.dashboard__slide} key={item.id} style={width}>
            <img
              src={JSON.parse(item.images)[0]}
              width={315}
              height={184}
              alt={item.name}
            />
            <div className={styles.dashboard__slide__inner}>
              <Link
                href={goToPartPage ? `/catalog/${item.id}` : '/catalog'}
                passHref
                legacyBehavior
              >
                <a href="">
                  <h3 className={styles.dashboard__slide__title}>
                    {item.name}
                  </h3>
                </a>
              </Link>
              <span className={styles.dashboard__slide__code}>
                Артикул: {item.vendor_code}
              </span>
              <span className={styles.dashboard__slide__price}>
                {formatPrice(item.price)} P
              </span>
            </div>
          </div>
        ))
      ) : (
        <span className={styles.dashboard__slider__empty}>
          Список товаров пуст....
        </span>
      )}
    </Slider>
  )
}

export default DashboardSlider
