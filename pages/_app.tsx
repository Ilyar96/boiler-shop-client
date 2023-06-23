import { FC, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useStore } from 'effector-react'
import { withHydrate } from 'effector-next'
import NextNProgress from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { $mode } from '@/context/mode'
import '@/styles/globals.css'

const enhance = withHydrate()

const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false)
  const mode = useStore($mode)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <NextNProgress />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          closeOnClick
          limit={1}
          theme={mode === 'dark' ? 'dark' : 'light'}
        />
      </>
    )
  )
}

export default enhance(App as FC<AppProps>)
