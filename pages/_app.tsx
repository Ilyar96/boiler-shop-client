import { FC, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { withHydrate } from 'effector-next'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const enhance = withHydrate()

const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          closeOnClick
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as FC<AppProps>)
