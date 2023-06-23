import { AnimatePresence, motion } from 'framer-motion'
import { IManufacturersBlockProps } from '@/types/catalog'
import ManufacturersBlockItem from './ManufacturersBlockItem'
import styles from '@/styles/catalog/index.module.scss'

const ManufacturersBlock = ({
  title,
  manufacturersList,
  event,
}: IManufacturersBlockProps) => {
  const checkedItems = manufacturersList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.manufacturers}
    >
      <h3 className={styles.manufacturers__title}>{title}</h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <ManufacturersBlockItem key={item.id} item={item} event={event} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
