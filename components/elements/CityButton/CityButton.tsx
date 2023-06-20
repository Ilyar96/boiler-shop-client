import React from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import LocationSvg from '../LocationSvg/LocationSvg'
import styles from '@/styles/CityButton/index.module.scss'
import cn from 'classnames'

const CityButton = () => {
  const mode = useStore($mode)

  return (
    <button
      className={cn(styles.city, {
        [styles.dark_mode]: mode === 'dark',
      })}
    >
      <span className={styles.city__span}>
        <LocationSvg />
      </span>
      <span className={styles.city__text}>Moscow</span>
    </button>
  )
}

export default CityButton
