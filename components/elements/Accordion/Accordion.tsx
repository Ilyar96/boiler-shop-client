import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { IAccordion } from '@/types/common'

const Accordion = ({
  children,
  title,
  arrowOpenClass = '',
  titleClass = '',
  isMobileForFilters,
  hideArrowClass = '',
  callback,
}: IAccordion) => {
  const [expanded, setExpanded] = useState(false)

  const toggleAccordion = () => {
    callback && callback(expanded)
    return setExpanded((prev) => !prev)
  }

  return (
    <>
      {title && (
        <>
          {isMobileForFilters ? (
            <button
              className={cn(titleClass, { [hideArrowClass]: hideArrowClass })}
              onClick={toggleAccordion}
            >
              {title}
            </button>
          ) : (
            <motion.button
              className={cn(titleClass, { [arrowOpenClass]: expanded })}
              onClick={toggleAccordion}
              initial={false}
            >
              {title}
            </motion.button>
          )}
        </>
      )}
      <AnimatePresence initial={false}>
        {(isMobileForFilters || expanded) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Accordion
