import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import { $mode } from '@/context/mode'
import styles from '@/styles/modeToggler/index.module.scss'

const ModeToggler = () => {
  const { toggleTheme } = useTheme()
  const mode = useStore($mode)

  const handleToggleMode = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  useEffect(() => {
    mode === 'dark' && document.body.classList.add('dark_mode')
  }, [mode])

  return (
    <div className={cn(styles.theme, { [styles.dark_mode]: mode === 'dark' })}>
      <input
        className={styles.theme__input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  )
}

export default ModeToggler
