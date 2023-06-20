import React from 'react'
import { useStore } from 'effector-react'
import cn from 'classnames'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'
import { $mode } from '@/context/mode'
import styles from '@/styles/header/index.module.scss'

const Header = () => {
  const mode = useStore($mode)
  return (
    <header
      className={cn(styles.header, {
        [styles.dark_mode]: mode === 'dark',
      })}
    >
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
