import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import { $mode } from '@/context/mode'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogPage = () => {
  const boilerParts = useStore($boilerParts)
  const mode = useStore($mode)
  const [spinner, setSpinner] = useState(false)

  //Todo заменить
  const event: any = null

  useEffect(() => {
    loadBoilerParts()
  }, [])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts')
      setBoilerParts(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section
      className={cn(styles.catalog, { [styles.dark_mode]: mode === 'dark' })}
    >
      <div className={cn('container', styles.catalog__container)}>
        <h2 className={styles.catalog__title}>Каталог товаров</h2>
        <div className={styles.catalog__top}>
          {false && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Производитель котлов:"
                manufacturersList={[]}
                event={event}
              />
            </AnimatePresence>
          )}
          {false && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Производитель запчастей:"
                manufacturersList={[]}
                event={event}
              />
            </AnimatePresence>
          )}
          <div className={styles.catalog__top__inner}>
            <button className={styles.catalog__top__reset} disabled>
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className={styles.catalog__bottom__filters}>Filters</div>
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
