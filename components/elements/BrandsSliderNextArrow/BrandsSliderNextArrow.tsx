import { CustomArrowProps } from 'react-slick'
import cn from 'classnames'
import BrandSliderArrowSvg from '../BrandsSliderArrow/BrandsSliderArrow'
import styles from '@/styles/dashboard/index.module.scss'

const BrandsSliderNextArrow = (props: CustomArrowProps) => (
  <button
    className={cn(
      styles.dashboard__brands__slider__arrow,
      styles.dashboard__brands__slider__arrow_next
    )}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
)

export default BrandsSliderNextArrow
