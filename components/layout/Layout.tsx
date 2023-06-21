import React, { PropsWithChildren } from 'react'
import Header from '@/components/modules/Header/Header'
import Footer from '@/components/modules/Footer/Footer'

const Layout = ({ children }: PropsWithChildren) => (
  <div className="wrapper">
    <Header />
    <main>
      {children}
      <div className="overlay" />
    </main>
    <Footer />
  </div>
)

export default Layout
