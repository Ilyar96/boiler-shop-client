import React, { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import { logoutFx } from '@/app/api/auth'
import styles from '@/styles/profileDropDown/index.module.scss'

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const router = useRouter()
    const toggleProfileDropdown = () => setOpen(!open)

    const handleLogout = async () => {
      await logoutFx('/users/logout')
      router.push('/')
    }

    return (
      <div
        className={cn(styles.profile, { [styles.dark_mode]: mode === 'dark' })}
        ref={ref}
      >
        <button className={styles.profile__btn} onClick={toggleProfileDropdown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.profile__dropdown}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <span className={styles.profile__dropdown__username}>
                  {user?.username}
                </span>
                <span className={styles.profile__dropdown__email}>
                  {user?.email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button
                  className={styles.profile__dropdown__item__btn}
                  onClick={handleLogout}
                >
                  <span className={styles.profile__dropdown__item__text}>
                    Выйти
                  </span>
                  <span className={styles.profile__dropdown__item__svg}>
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropdown.displayName = 'ProfileDropdown'

export default withClickOutside(ProfileDropdown)
