import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useStore } from 'effector-react'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import styles from '@/styles/dashboard/index.module.scss'
import { getBestsellersOrNewParts } from '@/app/api/boilerparts'
import { toast } from 'react-toastify'
import DashboardSlider from './DashboardSlider'

const DashboardPage = () => {
  const mode = useStore($mode)
  const [newParts, setNewParts] = useState<IBoilerPart[]>([])
  const [bestsellers, setBestsellers] = useState<IBoilerPart[]>([])
  const [spinner, setSpinner] = useState(false)

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const newParts = await getBestsellersOrNewParts('/boiler-parts/new')
      const bestSellerParts = await getBestsellersOrNewParts(
        '/boiler-parts/bestsellers'
      )

      setNewParts(newParts.rows)
      setBestsellers(bestSellerParts.rows)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    loadBoilerParts()
  }, [])

  return (
    <section
      className={cn(styles.dashboard, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.dashboard__container)}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>

        <h2 className={styles.dashboard__title}>Детали для газовых котлов</h2>

        <div className={styles.dashboard__parts}>
          <h3 className={styles.dashboard__parts__title}>Хиты продаж</h3>
          <DashboardSlider items={bestsellers} spinner={spinner} goToPartPage />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={styles.dashboard__parts__title}>Новинки</h3>
          <DashboardSlider items={newParts} spinner={spinner} goToPartPage />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
