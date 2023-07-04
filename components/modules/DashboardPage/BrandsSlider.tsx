import Image from 'next/image'
import React, { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
import styles from '@/styles/dashboard/index.module.scss'

const brandItems = [
  { id: 1, img: '/img/brand-1.png', alt: 'Brand 1' },
  { id: 2, img: '/img/brand-2.svg', alt: 'Brand 2' },
  { id: 3, img: '/img/brand-3.png', alt: 'Brand 3' },
  { id: 4, img: '/img/brand-4.png', alt: 'Brand 4' },
  { id: 5, img: '/img/brand-1.png', alt: 'Brand 1' },
  { id: 6, img: '/img/brand-2.svg', alt: 'Brand 2' },
  { id: 7, img: '/img/brand-3.png', alt: 'Brand 3' },
  { id: 8, img: '/img/brand-4.png', alt: 'Brand 4' },
  { id: 9, img: '/img/brand-1.png', alt: 'Brand 1' },
  { id: 10, img: '/img/brand-2.svg', alt: 'Brand 2' },
  { id: 11, img: '/img/brand-3.png', alt: 'Brand 3' },
  { id: 12, img: '/img/brand-4.png', alt: 'Brand 4' },
]

const settings = {
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  variableWidth: true,
  autoplay: true,
  speed: 5000,
  swipeToSlide: true,
  prevArrow: <BrandsSliderPrevArrow />,
  nextArrow: <BrandsSliderNextArrow />,
}

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )
    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          className={styles.dashboard__brands__slide}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <Image src={item.img} width={180} height={68} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
