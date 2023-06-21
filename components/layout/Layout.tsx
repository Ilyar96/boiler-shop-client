import React, { PropsWithChildren } from 'react'
import Header from '@/components/modules/Header/Header'
import Footer from '@/components/modules/Footer/Footer'

const Layout = ({ children }: PropsWithChildren) => (
  <div className="wrapper">
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
