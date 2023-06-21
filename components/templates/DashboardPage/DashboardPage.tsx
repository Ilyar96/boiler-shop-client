import React from 'react'
import cn from 'classnames'
import { useStore } from 'effector-react'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  const mode = useStore($mode)

  return (
    <section
      className={cn(styles.dashboard, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.dashboard__container)}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
