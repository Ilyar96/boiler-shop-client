import React from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import ManufacturersBlock from '../../modules/CatalogPage/ManufacturersBlock'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'

const CatalogPage = () => {
  const mode = useStore($mode)
  const event: any = null

  return (
    <section
      className={cn(styles.catalog, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.catalog__container)}>
        <h2 className={styles.catalog__title}>Каталог товаров</h2>
        <div className={styles.catalog__top}>
          <AnimatePresence>
            <ManufacturersBlock
              title="Производитель котлов:"
              manufacturersList={[]}
              event={event}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock
              title="Производитель запчастей:"
              manufacturersList={[]}
              event={event}
            />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button className={styles.catalog__top__reset}>
              Сбросить фильтр
            </button>
          </div>
          <FilterSelect />
        </div>
        <div className={styles.catalog__bottom}></div>
      </div>
    </section>
  )
}

export default CatalogPage
