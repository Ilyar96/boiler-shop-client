import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerparts'
import DashboardSlider from './DashboardSlider'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(shoppingCart.length > 0)
  const [newParts, setNewParts] = useState<IBoilerPart[]>([])
  const [bestsellers, setBestsellers] = useState<IBoilerPart[]>([])
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    loadBoilerParts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length > 0) {
      setShowAlert(true)
      return
    }
    setShowAlert(false)
  }, [shoppingCart.length])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')
      const bestSellerParts = await getBestsellersOrNewPartsFx(
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

  const closeAlert = () => {
    setShowAlert(false)
  }

  return (
    <section
      className={cn(styles.dashboard, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.dashboard__container)}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.dashboard__alert}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>

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
