import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import cn from 'classnames'
import { isEqual } from 'lodash'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import { $mode } from '@/context/mode'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { IQueryParams } from '@/types/catalog'
import { IBoilerPart, IBoilerPartsQuery } from '@/types/boilerparts'
import { BOILER_PARTS_PER_PAGE } from '@/constants'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const boilerParts = useStore($boilerParts)
  const router = useRouter()
  const mode = useStore($mode)
  const [spinner, setSpinner] = useState(false)
  const [currentPage, setCurrentPage] = useState(+query.offset)
  const prevParams = useRef<IBoilerPartsQuery | null>(null)
  const pageCount = Math.ceil(boilerParts.count / BOILER_PARTS_PER_PAGE)

  //Todo заменить
  const event: any = null

  useEffect(() => {
    if (router.query?.offset && +router.query.offset < 0) {
      router.replace({ query: { ...router.query, offset: 0 } }, undefined, {
        shallow: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadBoilerParts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.first, currentPage])

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected)
    router.replace(
      { query: { ...router.query, offset: event.selected } },
      undefined,
      { shallow: true }
    )
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const getBoilerPartQueryParams = (): IBoilerPartsQuery => {
    const first = window !== undefined ? router.query.first : query.first
    let sortField: keyof IBoilerPart = 'popularity'
    let sortType: 1 | -1 = -1

    switch (first) {
      case 'cheap':
        sortField = 'price'
        sortType = 1
        break
      case 'expensive':
        sortField = 'price'
        sortType = -1
        break
      case 'popular':
        sortField = 'popularity'
        sortType = -1
        break
    }

    return {
      offset: currentPage,
      sortField,
      sortType,
      limit: BOILER_PARTS_PER_PAGE,
    }
  }

  const loadBoilerParts = async () => {
    const params = getBoilerPartQueryParams()

    if (prevParams.current && isEqual(params, prevParams.current)) {
      return
    }

    prevParams.current = params

    try {
      setSpinner(true)
      const data = await getBoilerPartsFx({ url: '/boiler-parts', params })
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
            <CatalogFilters />

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
          {!spinner && boilerParts?.rows?.length > 0 && (
            <ReactPaginate
              containerClassName={styles.catalog__bottom__list}
              pageClassName={styles.catalog__bottom__list__item}
              pageLinkClassName={styles.catalog__bottom__list__item__link}
              previousClassName={styles.catalog__bottom__list__prev}
              nextClassName={styles.catalog__bottom__list__next}
              breakClassName={styles.catalog__bottom__list__break}
              breakLinkClassName={styles.catalog__bottom__list__break__link}
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={pageCount}
              forcePage={currentPage}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
